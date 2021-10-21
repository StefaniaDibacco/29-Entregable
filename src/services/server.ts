import express from 'express';
import handlebars from 'express-handlebars';
import * as http from 'http';
import router from '../routes/index';
import path from 'path';
import session from 'express-session';
import passport from '../middleware/auth';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const publicFolderPath = path.resolve(__dirname, '../../public');
app.use(express.static(publicFolderPath));

app.use(
  session({
    secret: 'your secret line of secretness',
    resave: true,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// configuracion de hbs
const layoutDirPath = path.resolve(__dirname, '../../views/layouts');
const defaultLayerPth = path.resolve(
  __dirname,
  '../../views/layouts/index.hbs'
);
const partialDirPath = path.resolve(__dirname, '../../views/partials');

app.set('view engine', 'hbs');
app.engine(
  'hbs',
  handlebars({
    layoutsDir: layoutDirPath,
    defaultLayout: defaultLayerPth,
    extname: 'hbs',
    partialsDir: partialDirPath,
  })
);

app.use('/api/', router);

// creo mi configuracion para socket
const myServer = new http.Server(app);

myServer.on('error', (err) => {
  console.log('ERROR ATAJADO', err);
});

export default myServer;
