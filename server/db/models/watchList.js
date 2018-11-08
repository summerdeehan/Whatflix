const Sequelize = require('sequelize')
const db = require('../db')

const WatchList = db.define('watchList', {
  title : {
    type: Sequelize.STRING,
    allowNull: false},
  genre:  {
    type: Sequelize.STRING,
    allowNull: false},
  movieId: {
    type: Sequelize.INTEGER,
    unique: true
  }
})

module.exports = WatchList
