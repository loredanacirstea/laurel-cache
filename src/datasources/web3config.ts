const config = {
  name: 'provider',
  connector: 'postgresql',
  url: process.env.POSTGRESQL_URL,
  host: process.env.POSTGRESQL_HOST,
  port: process.env.POSTGRESQL_PORT,
  user: process.env.POSTGRESQL_USER,
  password: process.env.POSTGRESQL_PASSW,
  database: process.env.POSTGRESQL_DB,
  ssl: {
    rejectUnauthorized: false,
    // rejectUnauthorized: true,
    // ca: fs.readFileSync(crtpath).toString(),
    // key: fs.readFileSync(keypath).toString(),
    // cert: dbCert,
  }
};
console.log('config', config);
export default config;
