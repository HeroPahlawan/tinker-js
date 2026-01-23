module.exports = {
  apps: [
    {
      name: 'inshopper_api',
      port: '5001',
      exec_mode: 'cluster',
      instances: 'max',
      script: 'index.mjs'
    }
  ]
}
