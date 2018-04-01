import React from 'react'
import { Switch, Route } from 'react-router-dom'

import ListPage from 'pages/List'
import DetailPage from 'pages/Detail'
import NewPostPage from 'pages/NewPost'

const App = () => {
  return (
    <div className="App">

      <h1 className="ui header title">Redable</h1>

      <div className="ui divider"></div>

      <Switch>
        <Route exact path='/new' component={NewPostPage}/>
        <Route path='/:category/:id' component={DetailPage}/>
        <Route path='/:category' component={ListPage}/>
        <Route exact path="/" component={ListPage}/>
      </Switch>

      <style jsx>{`
        div {
          max-width: 998px;
          margin: 25px auto 0;
        }

        div.App > h1.title {
          color: #666666;
          font-size: 50px;
          text-align: center;
          text-transform: uppercase;
        }
      `}</style>
    </div>
  );
}

export default App;
