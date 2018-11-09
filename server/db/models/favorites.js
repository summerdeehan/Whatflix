const Sequelize = require('sequelize')
const db = require('../db')

const Favorite = db.define('favorite', {
  title : {
    type: Sequelize.STRING,
    allowNull: false },
  poster_path : {
    type: Sequelize.STRING
  },
  genre_ids:  {
    type: Sequelize.ARRAY(Sequelize.INTEGER)
  },
  movieId: {
    type: Sequelize.INTEGER,
    unique: true
  },
  keywords: {
    type: Sequelize.ARRAY(Sequelize.INTEGER)
  },
  overview: {
    type: Sequelize.TEXT
  }
})


module.exports = Favorite;
