const User = require('./user');
const Favorite = require('./favorites');
const ViewHistory = require('./viewHistory');
const WatchList = require('./watchList');
const Recommended = require('./recommended');
const Genre = require('./genre');

Favorite.belongsTo(User)
ViewHistory.belongsTo(User)
WatchList.belongsTo(User)
Recommended.belongsTo(User)


module.exports = {
  User,
  Favorite,
  ViewHistory,
  WatchList,
  Genre,
  Recommended
}
