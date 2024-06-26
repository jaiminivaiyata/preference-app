import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import { PersistGate } from 'redux-persist/integration/react'
import storeConfig from './redux/store'

const store = storeConfig()

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <PersistGate persistor={store.__PERSISTOR} loading={null}>
      <App />
    </PersistGate>
  </Provider>
);
