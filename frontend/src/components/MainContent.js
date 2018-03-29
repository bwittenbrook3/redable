import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import Index from './Index'

class MainContent extends Component {

  render() {
    return (
      <Switch>
        <Route exact path='/' component={Index}/>
      </Switch>
    )
  }
}


export default MainContent;
