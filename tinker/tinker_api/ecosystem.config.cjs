module.exports = {
  apps: [
    {
      name: 'tinker_api',
      port: '5001',
      exec_mode: 'cluster',
      instances: 'max',
      script: 'index.mjs'
    }
  ]
}
