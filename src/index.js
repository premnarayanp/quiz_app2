import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, HashRouter } from 'react-router-dom';

import './styles/index.css';
import { App } from './components';
import { Provider } from 'react-redux';
import store from './redux/store/configureStore';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <HashRouter basename='/'>
    <Provider store={store}>
      <App />
    </Provider>
  </HashRouter>
);


