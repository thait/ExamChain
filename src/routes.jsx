import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/app';
import Home from './components/views/home';
import ExamDetail from './components/views/examdetail';
import Result from './components/views/result';
import Registration from './components/views/registration';

export default (
  <Route path='/' component={App}>
    <IndexRoute component={Home} />
    <Route path='examdetail' component={ExamDetail} />
    <Route path='result' component={Result} />
    <Route path='registration' component={Registration} />
    <Route path='*' component={Home} />
  </Route>
);