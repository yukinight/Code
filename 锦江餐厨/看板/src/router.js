import React, { PropTypes } from 'react';
import { Router, Route, IndexRoute, Link } from 'dva/router';
import CarTaskKanBan from './routes/carTaskKanBan';
import TaskDetail from './routes/taskDetail';

export default function({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={CarTaskKanBan} />
      <Route path="/:carId/:taskId" component={TaskDetail} />
    </Router>
  );
};
