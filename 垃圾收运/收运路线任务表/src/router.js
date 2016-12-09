import React, { PropTypes } from 'react';
import { Router, Route, IndexRoute, Link } from 'dva/router';
import carTasks from './routes/carTasks';

export default function({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={carTasks} />
    </Router>
  );
};
