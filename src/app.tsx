// lib imports
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
// app imports
import { default as MainLayout } from './layouts/main-layout';
import { HomeContainer } from './containers/home-container/index';
import { CssModulesContainer } from './containers/css-modules-container/index';
import { default as WbiAuthContainer } from './containers/wbi-auth-container/index';
import { default as DocumentContainer } from './containers/document-container/index';
import { store } from './store/index';
const history = syncHistoryWithStore(hashHistory, store) as any;

function App() {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Route component={MainLayout}>
          <Route path="/" component={HomeContainer} />
          <Route path="/document" component={DocumentContainer} />
          <Route path="/login" component={WbiAuthContainer} />
          <Route path="/css-modules" component={CssModulesContainer} />
        </Route>
      </Router>
    </Provider>
  );
}

export const app = ReactDOM.render(
  <App />, document.getElementById('app-container'),
);
