const Sequelize = require('sequelize')
const db = require('../db')

const Recommended = db.define('recommended', {
  title : {
    type: Sequelize.STRING,
    allowNull: false },
  movieId: {
    type: Sequelize.INTEGER
  },
  weight: {
    type: Sequelize.INTEGER,
    defaultValue: 1
  }
})
Recommended.prototype.addCount = function () {
  this.weight++;
}


module.exports = Recommended;
