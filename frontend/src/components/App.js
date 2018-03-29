import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getPosts, getCategories } from 'actions'
import { colors } from 'styles'
import { Switch, Route, withRouter } from 'react-router-dom'

import ListPage from 'pages/List'
import DetailPage from 'pages/Detail'


class App extends Component {

  componentDidMount() {
    this.props.getPosts();
    this.props.getCategories();
  }

  render() {

    return (
      <div className="App">

        <Switch>
          <Route path='/:category/:id' component={DetailPage}/>
          <Route path='/:category' component={ListPage}/>
          <Route exact path="/" component={ListPage}/>
        </Switch>

        <style jsx>{`
          :global(body) {
            padding: 20px;
            background-color: #ggg;
          }

          div.App{
            max-width: 998px;
            margin: 25px auto 0;
          }

          div :global(.ui.menu){
            font-size: 20px;
            color: teal;

            :global(a.item:hover) {
              color: palevioletred;
            }

            :global(a.item.active){
              color: palevioletred;
              text-decoration: underline;
              &:hover {
                color: palevioletred;
              }
            }
          }

          p {
            color: ${colors.primary};
          }
        `}</style>
      </div>
    );
  }
}


const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getPosts: () => dispatch(getPosts()),
    getCategories: () => dispatch(getCategories())
  }
}

export default withRouter(connect(null, mapDispatchToProps)(App));
