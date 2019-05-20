import React from 'react';
import { Switch } from 'react-router-dom'
import { BrowserRouter as Router } from 'react-router-dom'

import HomePage from './routes/HomePage'
import LoginPage from './routes/LoginPage'
import ProfilePage from './routes/ProfilePage'
import ShopPage from './routes/ShopPage'
import SettingsPage from './routes/SettingsPage'
import RegisterPage from './routes/RegisterPage'
import ForgotPasswordPage from './routes/ForgotPasswordPage'
import ResetPasswordPage from './routes/ResetPasswordPage'

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
            <ProtectedRoute  path="/profile" component={ ProfilePage } />
            <ProtectedRoute  path="/settings" component={ SettingsPage } />
            <ProtectedRoute  path="/shop" component={ ShopPage } />
            <GuestRoute path="/login" component={ LoginPage } />
            <GuestRoute path="/register" component={ RegisterPage } />
            <GuestRoute path="/forgot-password" component={ ForgotPasswordPage } />
            <GuestRoute path="/reset-password/:token" component={ ResetPasswordPage } />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
