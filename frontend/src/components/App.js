import React from 'react'
import { Switch, Route } from 'react-router-dom'

import ListPage from 'pages/List'
import DetailPage from 'pages/Detail'
import NewPostPage from 'pages/NewPost'

const App = () => {
  return (
    <div>

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
      `}</style>
    </div>
  );
}

export default App;
