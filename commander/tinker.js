const { Command } = require('commander');
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');
import axios from 'axios';

const program = new Command();

program
  .name('tinker')
  .description('Your tinker developer at your service')
  .version('0.8.0');

program.command('generate')
  .description('Generate new project')
  .argument('<projectName>', 'string for app name')
  .action((projectName) => {
    const repoUrl = 'https://github.com/aslamdoctor/nuxt-with-express.git'; // Replace with your repo
    const tempDir = path.join(os.tmpdir(), projectName);
    const documentsDir = path.join(process.env.USERPROFILE, 'Documents');
    const targetDir = path.join(documentsDir, projectName);

    try {
      console.log(`Cloning ${repoUrl} into ${tempDir}...`);
      execSync(`git clone ${repoUrl} "${tempDir}"`, { stdio: 'inherit' });

      console.log(`Copying project to ${targetDir}...`);
      fs.cpSync(tempDir, targetDir, { recursive: true });

      console.log(`✅ Project "${projectName}" created at ${targetDir}`);
    } catch (err) {
      console.error('❌ Error:', err.message);
    }
  });

program.command('createdb')
  .description('Generate new mongodb database')
  .argument('<databasename>', 'string for db name')
  .argument('<values>', 'string for db name')
  .action((databasename, values) => {   
    const run = async () => {
    try{
      const response = await axios.post('http://localhost:3000/api/createdb', {
        name: databasename,
        value: values
      });
        console.log('✅ Success:', response.data);
      } catch (error) {
        console.error('❌ Error:', error.response?.data || error.message);
      }
    };
    run();
  });

program.parse();
