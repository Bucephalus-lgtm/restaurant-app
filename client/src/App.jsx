import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './routes/Home';
import UpdatePage from './routes/UpdatePage';
import RestaurantDetailPage from './routes/RestaurantDetailPage';
import { RestaurantContextProvider } from './context/RestaurantContext';

const App = () => {
  return (
    <Fragment>
      <RestaurantContextProvider>
        <Router>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/restaurants/:id/update' component={UpdatePage} />
            <Route exact path='/restaurants/:id' component={RestaurantDetailPage} />
          </Switch>
        </Router>
      </RestaurantContextProvider>
    </Fragment>
  )
}

export default App;