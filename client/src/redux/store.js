/* eslint-disable import/no-anonymous-default-export */
import { createStore, applyMiddleware, compose } from 'redux'
import {thunk} from 'redux-thunk'
import { persistStore, persistReducer } from 'redux-persist'
import rootReducer from './reducers/rootReducer'
import storage from 'redux-persist/lib/storage'

export default (initialState) => {
  let store
  const persistConfig = {
    key: 'root',
    storage,
  }
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  store = createStore(
    persistReducer(persistConfig, rootReducer),
    composeEnhancers(applyMiddleware(thunk)),
    initialState
  )
  store.__PERSISTOR = persistStore(store)

  if (module.hot) {
    module.hot.accept('./reducers/rootReducer', () => {
      const createNextReducer = require('./reducers/rootReducer').default
      // passed initialState to adapt changes in reducers
      store.replaceReducer(createNextReducer(initialState))
    })
  }

  return store
}
