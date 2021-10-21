import routerProductos from './productos';
import cartRouter from './carrito';
import { isLoggedIn } from '../middleware/auth';
import UserRouter from './user';
import authRouter from './auth';
import path from 'path';
import args from 'args';
import { fork } from 'child_process';
import { Router, Request, Response } from 'express';

const router = Router();

router.use('/productos', routerProductos);
router.use('/cart', cartRouter); // A REALIZAR PARA LA PROXIMA ENTREGA
router.use('/', authRouter);
router.get('/hello', (req, res) => {
  res.json({ msg: 'HOLA', session: req.session });
});

router.use('/user', isLoggedIn, UserRouter);

router.use('/info', (req: Request, res: Response) => {
  const flags = args.parse(process.argv);
  const info = {
    args: flags,
    os: process.platform,
    nodeVersion: process.version,
    memory: process.memoryUsage(),
    processId: process.pid,
    folder: process.cwd(),
  };

  res.json({ data: info, pid: process.pid });
});

router.use('/randoms', (req: Request, res: Response) => {
  const { cant } = req.query;
  const numberQty = cant || String(100000000);
  console.log(`PID => ${process.pid} will work slow`);
  const scriptPath = path.resolve(
    __dirname,
    '../../dist/utils/getRandomNums.js'
  );

  const numData = fork(scriptPath, [numberQty as string]);
  numData.send('start');
  numData.on('message', (result) => {
    res.json({ data: result });
  });
});

router.get('/dead', (req, res) => {
  res.json({ msg: 'OK' });
  console.log(`PID => ${process.pid} will die`);
  process.exit(0);
});
export default router;
