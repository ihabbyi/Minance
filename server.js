const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: '.env' });

process.on('uncaughtException', (err) => {
  console.log('uncaught exception! ❌ shutting down...');
  console.log(`${err.name}: ${err.message}`);
  console.log(`${err.stack}`);
  process.exit(1);
});

const app = require('./app');

const db = process.env.DATABASE.replace(
  '<username>',
  process.env.DB_USERNAME
).replace('<password>', process.env.DB_PASSWORD);

try {
  mongoose
    .connect(db, {
      useNewUrlParser: true,
    })
    .then(() => {
      console.log('db connected successful! 📄');
    });
} catch (e) {
  console.log(`cannot connect to the db`);
}

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log('ــــــــــــــــــــــــــــــــــــــــــ');
  console.log(`app running on http://127.0.0.1:${port} ⚒`);
});

process.on('unhandledRejection', (err) => {
  console.log('unhandled rejection! ❌ shutting down...');
  console.log(`${err.name}: ${err.message}`);

  server.close(() => {
    process.exit(1);
  });
});
