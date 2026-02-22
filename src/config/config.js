const env = process.env.NODE_ENV || 'dev';
const envs = {
  'dev': '.env',
  'e2e': '.env.e2e'
}

const options = {};

if (envs[env]) {
  options.path = envs[env];
}

require('dotenv').config(options);

const config = {
  env,
  isProd: process.env.NODE_ENV === 'production',
  isEnd2End: process.env.NODE_ENV === 'e2e',
  isCi: process.env.NODE_ENV === 'ci',
  port: process.env.PORT || 3000,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST,
  dbName: process.env.DB_NAME,
  dbPort: process.env.DB_PORT,
  allowedList: [
    process.env.DOMAIN_1,
    process.env.DOMAIN_2,
    process.env.DOMAIN_3,
    ...(process.env.NODE_ENV !== 'production' ? ['http://localhost:5173'] : []),
  ],
  apiKey: process.env.API_KEY,
  jwtSecret: process.env.JWT_SECRET,
}

module.exports = config;
