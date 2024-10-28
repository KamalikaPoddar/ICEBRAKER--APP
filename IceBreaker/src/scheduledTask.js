const cron = require('node-cron');
const fs = require('fs-extra');
const path = require('path');
const { generateToken, readEntitySecret } = require('./api/sahamatiApi');

const DATA_FILE = path.join(__dirname, 'data', 'sahamatiData.json');

async function runSahamatiApi() {
  try {
    const accessToken = await generateToken();
    console.log('Access Token generated:', accessToken);

    const entitySecret = await readEntitySecret(accessToken);
    console.log('Entity Secret retrieved:', entitySecret);

    const data = {
      timestamp: new Date().toISOString(),
      accessToken,
      entitySecret
    };

    await fs.ensureFile(DATA_FILE);
    const existingData = await fs.readJson(DATA_FILE, { throws: false }) || [];
    existingData.push(data);
    await fs.writeJson(DATA_FILE, existingData, { spaces: 2 });

    console.log('Data stored successfully');
  } catch (error) {
    console.error('Error in runSahamatiApi:', error);
  }
}

// Schedule the task to run every 24 hours
cron.schedule('0 0 * * *', () => {
  console.log('Running scheduled task');
  runSahamatiApi();
});

// Run the task immediately when the script starts
console.log('Initial run of the task');
runSahamatiApi();

console.log('Scheduler started. The task will run every 24 hours.');