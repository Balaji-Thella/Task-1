module.exports = {
  apps: [
    {
      name: "server1",
      script: "app.js",
      watch: true,
      instances: "3",
      exec_mode: "cluster",
      // max_memory_restart: '1000K',
      ignore_watch: ["logs/*", "public", "public/*", "dump.rdb"],
      output: "logs/pm2/out.log",
      error: "logs/pm2/error.log",
      log: "logs/pm2/combined.outerr.log",
      env: {
        PORT: "8000",
      },
    },
  ],
};
