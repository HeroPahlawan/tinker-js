module.exports = {
  apps: [
    {
      name: 'tinker_api',
      port: '3001',
      exec_mode: 'cluster',
      instances: 'max',
      script: 'index.mjs'
    }
  ]
}
