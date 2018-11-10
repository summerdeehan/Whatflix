import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import search from './search'
import config from './config'
import moviePicks from './movie-picks'
import results from './results'

const reducer = combineReducers({user, results, search, config, moviePicks})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './search'
export * from './movie-picks'
export * from './config'
export * from './results'
