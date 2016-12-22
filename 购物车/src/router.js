import React, { PropTypes } from 'react';
import { Router, Route, IndexRoute, Link } from 'dva/router';
import shoppingCartPanel from './routes/shoppingCartPanel';

export default function({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={shoppingCartPanel} />
      <Route path="/shoppingCart" component={shoppingCartPanel} />
    </Router>
  );
};
