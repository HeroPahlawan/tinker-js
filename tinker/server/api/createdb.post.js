import mongoose from 'mongoose';
import fs from 'fs/promises';
import bcrypt from 'bcryptjs';

const BCRYPT_ROUNDS = 12;
const PASSWORD_FIELDS = ['password', 'passwd', 'pass'];

async function hashPasswordFields(records) {
  return Promise.all(records.map(async (record) => {
    const hashed = { ...record };
    for (const field of PASSWORD_FIELDS) {
      if (hashed[field] && typeof hashed[field] === 'string') {
        hashed[field] = await bcrypt.hash(hashed[field], BCRYPT_ROUNDS);
      }
    }
    return hashed;
  }));
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const uri = config.MONGODB_URI;

  if (!uri) {
    return { success: false, message: 'MONGODB_URI is not set in runtime config. Check your .env file.' };
  }

  // Connect to MongoDB
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(uri);
  }

  // Read and parse the ERD JSON
  const rawData = await fs.readFile('./erd.json', 'utf-8');
  const erd = JSON.parse(rawData);

  // Map string types to Mongoose types
  const typeMap = {
    String: String,
    Number: Number,
    Boolean: Boolean,
    Date: Date,
    ObjectId: mongoose.Schema.Types.ObjectId,
    Mixed: mongoose.Schema.Types.Mixed
  };

  // Generate models
  const models = {};
  for (const [tableName, tableDef] of Object.entries(erd)) {
    const schemaDef = {};
    for (const [field, typeStr] of Object.entries(tableDef.structure)) {
      schemaDef[field] = typeMap[typeStr] || mongoose.Schema.Types.Mixed;
    }

    const schema = new mongoose.Schema(schemaDef, { timestamps: true });
    // Pass tableName as 3rd arg to force the exact collection name (no Mongoose auto-pluralization)
    models[tableName] = mongoose.models[tableName] || mongoose.model(tableName, schema, tableName);

    // Insert seed data only if the collection is empty (prevent duplicates on repeated runs)
    if (Array.isArray(tableDef.data) && tableDef.data.length > 0) {
      const count = await models[tableName].countDocuments();
      if (count === 0) {
        const records = await hashPasswordFields(tableDef.data);
        await models[tableName].insertMany(records);
      }
    }
  }

  return {
    success: true,
    message: 'All tables created and data inserted.'
  };
});
