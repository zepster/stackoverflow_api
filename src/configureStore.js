import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import createReducer from './reducers';

export default function configureStore(initialState = {}) {

  const composeEnhancers =
    process.env.NODE_ENV !== 'production' &&
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
              shouldHotReload: false
          })
        : compose;

  const store = createStore(
    createReducer(),
    initialState,
    composeEnhancers(...[applyMiddleware(thunk)])
  );
  return store;
}
