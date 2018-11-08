const Sequelize = require('sequelize')
const db = require('../db')

const Favorite = db.define('favorite', {
  title : {
    type: Sequelize.STRING,
    allowNull: false },
  genre:  {
    type: Sequelize.ARRAY(Sequelize.INTEGER)},
  movieId: {
    type: Sequelize.INTEGER,
    unique: true
  }
})


module.exports = Favorite;
