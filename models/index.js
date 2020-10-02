const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/wikistack', {
  logging: false
});

db.authenticate()
  .then(() => {
    console.log('connected to the database');
  });

function generateSlug (title) {
  // Removes all non-alphanumeric characters from title
  // And make whitespace underscore
  return title.replace(/\s+/g, '_').replace(/\W/g, '');
}

//define Schemas/blueprints of the Sequelize Models
const Page = db.define('page', {
  title: {
    type:Sequelize.STRING,
    allowNull:false
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false
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

Page.beforeValidate((page) => {
  if (!page.slug) {
    page.slug = generateSlug(page.title).toLowerCase()
  }
})

Page.belongsTo(User, { as: 'author' })
// User.hasMany(Page)

module.exports = {
  db, Page, User
};
