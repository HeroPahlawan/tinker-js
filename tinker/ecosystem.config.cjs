const config = useRuntimeConfig();
module.exports = {
  apps: [
    {
      name: config.public.APP_NAME,
      port: '3000',
      exec_mode: 'cluster',
      instances: 'max',
      script: '.output/server/index.mjs'
    }
  ]
}
