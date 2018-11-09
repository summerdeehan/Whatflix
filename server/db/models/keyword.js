const Sequelize = require('sequelize')
const db = require('../db')

const Keyword = db.define('keyword', {
  name : {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true},

  movieDBId: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

module.exports = Keyword;
