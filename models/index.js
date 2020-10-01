const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/wikistack', {
  logging: false
});

//define Schemas/blueprints of the Sequelize Models
const Page = db.define('page', {
  title: {
    type:Sequelize.STRING,
    allowNull:false
  },
  slug: {
    type: Sequelize.STRING,
    allowNull:false
  },
  content: {
    type: Sequelize.TEXT,
    allowNull:false
  },
  status: Sequelize.ENUM('open', 'closed')
});

const User = db.define('user', {
  name: {
    type:Sequelize.STRING,
    allowNull:false,
    validate: {
      isAlpha: true
    }
  },
  email: {
    type: Sequelize.STRING,
    allowNull:false,
    validate: {
      isEmail: true
    }
  }
});


module.exports = {
  db, Page, User
};