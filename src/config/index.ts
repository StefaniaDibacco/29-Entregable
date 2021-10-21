import dotenv from 'dotenv';
import args from 'args';

dotenv.config();

const options = [
  {
    name: 'port',
    description: 'The port on which the app runs',
  },
  {
    name: 'faceId',
    description: 'Facebook app ID',
  },
  {
    name: 'faceSecret',
    description: 'Facebook app secret',
  },
];

args.options(options);

const flags = args.parse(process.argv);

const env = {
  MONGO_ATLAS_URL: process.env.MONGO || 'mongoSRV',
  PORT: flags.port || process.env.PORT || 8080,
  FACEBOOK_APP_ID: flags.faceId || process.env.FACEBOOK_APP_ID || 'faceId',
  FACEBOOK_APP_SECRET:
    flags.faceSecret || process.env.FACEBOOK_APP_SECRET || 'faceSecret',
};

console.log('ID del proceso =>', process.pid);

export default env;
