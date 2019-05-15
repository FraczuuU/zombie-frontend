import React from 'react'
import { Route, Redirect } from 'react-router-dom'

import { loggedIn } from '../services/auth'

  export class GuestRoute extends React.Component  {
    constructor(props) {
      super(props)

      this.state = {
        auth: false,
        lodaded: false
      }
    }

    componentWillMount = async() => {
      this.setState({
        auth: await loggedIn(),
        loaded: true
      })
    }

    render() {
      const { component: Component, ...rest } = this.props
      if (!this.state.loaded) return null
      return (
        <Route
          {...rest}
          render={props => {
          return !this.state.auth 
          ? ( <Component {...props} /> ) 
          : ( <Redirect to='/' /> )
        }}
      />
    )
  }
}
  