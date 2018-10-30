import React from 'react';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';

import Hello from './routes/HelloPage';
import Home from './routes/HomePage';
import Index from './routes/IndexPage';

// console.log(Home, 'HomePage');
// console.log(typeof Home);

const RouterConfig = () => {
  return (
    <Router>
      <Switch>
        <Route path='/' exact component={Index} />
        <Route path='/hello' exact component={Hello} />
        <Route path='/home' exact component={Home} />
      </Switch>
    </Router>
  );
};

export default RouterConfig;