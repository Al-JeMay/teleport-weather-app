/*
===========================================================
 Title:  Teleport Weather App Demo
 Author: Al JeMay
 Date:   6 July 2020
 email: azmanshaffie@gmail.com
===========================================================
*/
import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Index from './components/layout/Index';
import {Provider} from './context';

function App () {
  return (
    <Provider>
      <Router>
        <React.Fragment>
          <Navbar />
          <div className="container">
            <Switch>
              <Route exact path="/" component={Index} />
            </Switch>
          </div>
        </React.Fragment>
      </Router>
    </Provider>
  );
}

export default App;
