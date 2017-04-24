import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'remote-redux-devtools';
import reducer from '../reducers/risk-level';


export default function configureStore(initialState) {
  const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(
      applyMiddleware(thunk),
    )
  );

  if (module.hot) {
    // Enable hot module replacement for reducers
    module.hot.accept(() => {
      const nextRootReducer = require('../reducers/risk-level').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
};