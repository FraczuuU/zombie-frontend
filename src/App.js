import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom'

import HomePage from './routes/HomePage'
import LoginPage from './routes/LoginPage'
import ProfilePage from './routes/ProfilePage'
import ShopPage from './routes/ShopPage'
import SettingsPage from './routes/SettingsPage'
import RegisterPage from './routes/RegisterPage'

import { ProtectedRoute } from './components/ProtectedRoute'
import { GuestRoute } from './components/GuestRoute'

import './App.css';

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Switch>
            <ProtectedRoute exact path="/" component={ HomePage } />
            <ProtectedRoute exact path="/profile" component={ ProfilePage } />
            <ProtectedRoute exact path="/settings" component={ SettingsPage } />
            <ProtectedRoute exact path="/shop" component={ ShopPage } />
            <GuestRoute path="/login" component={ LoginPage } />
            <GuestRoute path="/register" component={ RegisterPage } />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
