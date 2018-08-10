import { createStore, combineReducers, applyMiddleware } from 'redux'
import { breweries } from './reducers/breweries'
import { drawer } from './reducers/drawer'
import thunk from 'redux-thunk'

const store = createStore(
  combineReducers({
    drawer,
    breweries
  }),
  applyMiddleware(thunk)
)

export default store
