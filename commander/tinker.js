const { Command } = require('commander');
const { execSync }  = require('child_process');
const fs            = require('fs');
const path          = require('path');
const os            = require('os');
const axios         = require('axios');
const { scaffoldOne, scaffoldAll } = require('./scaffold');

const program = new Command();

program
  .name('tinker')
  .description('Your tinker developer at your service')
  .version('0.8.0');

/* ─────────────────────────────────────────
   tinker generate <projectName>
   Scaffold a new project from the template
───────────────────────────────────────── */
program.command('generate')
  .description('Generate a new project from the Tinker template')
  .argument('<projectName>', 'Name of the project to create')
  .action((projectName) => {
    const repoUrl    = 'https://github.com/HeroPahlawan/tinker-js-template-source.git';
    const tempDir    = path.join(os.tmpdir(), projectName);
    const targetDir  = path.join(process.env.USERPROFILE || os.homedir(), 'Documents', projectName);

    try {
      console.log(`\n⚙  Cloning template into ${tempDir}...`);
      execSync(`git clone ${repoUrl} "${tempDir}"`, { stdio: 'inherit' });

      console.log(`📁 Copying project to ${targetDir}...`);
      fs.cpSync(tempDir, targetDir, { recursive: true });

      console.log(`✅ Project "${projectName}" created at:\n   ${targetDir}\n`);
    } catch (err) {
      console.error('❌ Error:', err.message);
      process.exit(1);
    }
  });

/* ─────────────────────────────────────────
   tinker seeddb [options]
   POST /api/createdb → seeds MongoDB from erd.json
───────────────────────────────────────── */
program.command('seeddb')
  .description('Initialize MongoDB collections and seed data from erd.json via the running Nuxt app')
  .option('--host <url>', 'Base URL of the running Nuxt app', 'http://localhost:3000')
  .action(async (options) => {
    const endpoint = `${options.host}/api/createdb`;
    console.log(`\n⚙  Seeding database via ${endpoint}...`);

    try {
      const response = await axios.post(endpoint);
      if (response.data?.success) {
        console.log('✅ Success:', response.data.message);
      } else {
        console.warn('⚠  Response received but may not have succeeded:');
        console.log(response.data);
      }
    } catch (err) {
      const detail = err.response?.data || err.message;
      console.error('❌ Error:', typeof detail === 'object' ? JSON.stringify(detail, null, 2) : detail);
      process.exit(1);
    }
  });

/* ─────────────────────────────────────────
   tinker createdb <databasename> <values>
   (legacy — kept for backward compatibility)
───────────────────────────────────────── */
program.command('createdb')
  .description('Create MongoDB database via API (legacy — prefer seeddb)')
  .argument('<databasename>', 'Database name')
  .argument('<values>',       'Values string')
  .option('--host <url>', 'Base URL of the running Nuxt app', 'http://localhost:3000')
  .action(async (databasename, values, options) => {
    const endpoint = `${options.host}/api/createdb`;
    console.log(`\n⚙  Calling ${endpoint}...`);

    try {
      const response = await axios.post(endpoint, { name: databasename, value: values });
      console.log('✅ Success:', response.data);
    } catch (err) {
      console.error('❌ Error:', err.response?.data || err.message);
      process.exit(1);
    }
  });

/* ─────────────────────────────────────────
   tinker scaffold [table]
   Generate CRUD page + API routes + menu entry from erd.json
   ─────────────────────────────────────────
   Examples
     node tinker.js scaffold m_branch        ← scaffold one table
     node tinker.js scaffold --all           ← scaffold every eligible table
     node tinker.js scaffold m_branch --project /path/to/my-app
─────────────────────────────────────────── */
program.command('scaffold')
  .description('Generate CRUD page, API routes, and menu entry from erd.json')
  .argument('[table]', 'Table name from erd.json (e.g. m_branch). Required unless --all is used.')
  .option('--all',            'Scaffold every non-system table in erd.json')
  .option('--project <path>', 'Path to the Nuxt project root', path.resolve(__dirname, '..', 'tinker'))
  .action((table, options) => {
    const projectRoot = path.resolve(options.project);

    if (!fs.existsSync(projectRoot)) {
      console.error(`❌  Project not found: ${projectRoot}`);
      console.error(`    Use --project <path> to point to the correct directory.`);
      process.exit(1);
    }

    if (options.all) {
      scaffoldAll(projectRoot);
      console.log('\n✔  Done.\n');
    } else if (table) {
      scaffoldOne(table, projectRoot);
      console.log('\n✔  Done.\n');
    } else {
      console.error('❌  Provide a table name or use --all.');
      console.error('    Usage: node tinker.js scaffold <table>');
      console.error('           node tinker.js scaffold --all');
      process.exitCode = 1;
    }
  });

program.parse();
