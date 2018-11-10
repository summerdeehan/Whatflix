const Sequelize = require('sequelize')
const db = require('../db')

const Recommended = db.define('recommended', {
  poster_path : {
    type: Sequelize.STRING
  },
  overview : {
    type: Sequelize.TEXT
  },
  genre_ids:  {
    type: Sequelize.ARRAY(Sequelize.INTEGER)
  },
  title : {
    type: Sequelize.STRING,
    allowNull: false },
  movieId: {
    type: Sequelize.INTEGER
  },
  weight: {
    type: Sequelize.INTEGER,
    defaultValue: 1
  },
  keywords: {
    type: Sequelize.ARRAY(Sequelize.INTEGER)
  }
})

Recommended.prototype.addCount = function () {
  const newWeight = this.weight + 1;
  this.update({weight: newWeight})
}


module.exports = Recommended;
