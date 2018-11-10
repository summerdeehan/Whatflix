const Sequelize = require('sequelize')
const db = require('../db')

const ViewHistory = db.define('viewHistory', {
  title : {
    type: Sequelize.STRING,
    allowNull: false},
  movieId: {
    type: Sequelize.INTEGER,
    unique: true
  }
})

module.exports = ViewHistory;
