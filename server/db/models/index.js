const User = require('./user');
const Favorite = require('./favorites');
const ViewHistory = require('./viewHistory');
const WatchList = require('./watchList');
const Recommended = require('./recommended');
const Genre = require('./genre');
const Keyword = require('./keyword');

Favorite.belongsTo(User)
ViewHistory.belongsTo(User)
WatchList.belongsTo(User)
Recommended.belongsTo(User)
Keyword.belongsTo(User)

module.exports = {
  User,
  Favorite,
  ViewHistory,
  WatchList,
  Genre,
  Recommended,
  Keyword
}
