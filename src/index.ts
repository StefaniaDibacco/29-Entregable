import { init } from './services/sockets';
import myServer from './services/server';
import { Server } from 'socket.io';
import Config from './config';
import cluster from 'cluster';
import os from 'os';

const io = new Server(myServer);
const puerto = Config.PORT;
init(io);

const numCPUs = os.cpus().length - 1;
const clusterMode = process.argv.includes('CLUSTER');

if (clusterMode && cluster.isMaster) {
  console.log(`NUMERO DE CPUS ===> ${numCPUs}`);
  console.log(`PID MASTER ${process.pid}`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker) => {
    console.log(`Worker ${worker.process.pid} died at ${Date()}`);
    cluster.fork();
  });
} else {
  myServer.listen(puerto, () =>
    console.log(`Server up puerto ${puerto}- PID WORKER ${process.pid}`)
  );
}
