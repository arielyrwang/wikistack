const express = require('express');
const morgan = require('morgan');
const { db, Page, User } = require('./models');

const app = express();

const html = require('./views/layout')
const wikiRouter = require('./routes/wiki');
const usersRouter = require('./routes/users');

//middleware
app.use(express.static(__dirname + '/public'))

app.use(express.urlencoded({extended : false}))

app.use('/wiki', wikiRouter);
//get requests
app.get('/', (req, res, next)=> {
  res.send(html());
});

app.get('/',(req,res,next)=> {
  res.redirect('/wiki');
});

//port

db.authenticate()
  .then(() => {
    console.log('connected to the database');
  });

const init = async () => {
  await Page.sync();
  await User.sync();
  await db.sync();
  // make sure that you have a PORT constant
  const PORT = 1337
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}!`);
  });
}

init();



