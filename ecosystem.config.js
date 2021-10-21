module.exports = {
  apps: [
    {
      name: 'app-fork',
      script: './dist/src/index.js',
      watch: true,
      autorestart: true,
      args: '--mode fork --run pm2',
    },
    {
      name: 'app-cluster',
      script: './dist/src/index.js',
      watch: true,
      autorestart: true,
      instances: -1,
      args: '--mode cluster --run pm2',
    },
  ],
};
