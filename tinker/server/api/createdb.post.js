import mongoose from 'mongoose';
import fs from 'fs/promises';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const uri = config.MONGODB_URI;

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
    models[tableName] = mongoose.models[tableName] || mongoose.model(tableName, schema);

    // Insert data if not already present
    if (Array.isArray(tableDef.data)) {
      await models[tableName].insertMany(tableDef.data);
    }
  }

  return {
    success: true,
    message: 'All tables created and data inserted.'
  };
});
