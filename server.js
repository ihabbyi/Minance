const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: '.env' });

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
app.listen(port, () => {
  console.log('ــــــــــــــــــــــــــــــــــــــــــ');
  console.log(`app running on http://127.0.0.1:${port} ⚒`);
});
