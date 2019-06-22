const Sequelize = require('sequelize')
const path = require('path')

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, '../database/database.sqlite')
});

/* 测试连接
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
*/

const Note = sequelize.define('note', {
  // attributes
  text: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

/*
Note.sync().then(() => {
  Note.create({text: 'hello'})
});

Note.findAll({raw: true}).then(notes => {
  console.log(notes);
});
*/

module.exports = Note