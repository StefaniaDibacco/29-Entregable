import { init } from './services/sockets';
import myServer from './services/server';
import { Server } from 'socket.io';
import Config from './config';

const io = new Server(myServer);
const puerto = Config.PORT;

init(io);

myServer.listen(puerto, () => console.log(`Server up puerto ${puerto}`));
