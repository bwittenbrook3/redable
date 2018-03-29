import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getPosts, getCategories } from 'actions'
import { colors } from 'styles'
import _ from 'lodash'
import { Grid } from 'semantic-ui-react'

import MainContent from './MainContent'
import SideBar from './SideBar'

class App extends Component {

  componentDidMount() {
    this.props.getPosts();
    this.props.getCategories();
  }

  render() {

    return (
      <div className="App">

        <Grid>
          <Grid.Column width={4}>
            <SideBar />
          </Grid.Column>
          <Grid.Column width={12}>
            <MainContent />
          </Grid.Column>
        </Grid>


        <style jsx>{`
          :global(body) {
            padding: 20px;
            background-color: papayawhip;
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



const mapStateToProps = (state, ownProps) => {
  return {
    categories: _.values(state.categories)
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getPosts: () => dispatch(getPosts()),
    getCategories: () => dispatch(getCategories())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
