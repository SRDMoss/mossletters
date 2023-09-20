module.exports = {
  apps: [
    {
      name: 'Mossletters',
      script: 'server.js', 
      env: {
        NODE_ENV: 'development',
        PORT: 3000,
        HOST: '127.0.0.1'
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 8080,
        HOST: '127.0.0.1'
      }
    }
  ]
};
