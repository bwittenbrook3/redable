import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getPosts } from 'actions'
import { colors } from 'styles'
import _ from 'lodash'
import Post from './Post'
import { Grid, Menu } from 'semantic-ui-react'

class App extends Component {

  state = { activeItem: 'closest' }

  componentDidMount() {
    this.props.getPosts();
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <div className="App">


        <Grid>
          <Grid.Column width={4}>
            <Menu text vertical>
              <Menu.Item header>Sort By</Menu.Item>
              <Menu.Item name='closest' active={activeItem === 'closest'} onClick={this.handleItemClick} />
              <Menu.Item name='mostComments' active={activeItem === 'mostComments'} onClick={this.handleItemClick} />
              <Menu.Item name='mostPopular' active={activeItem === 'mostPopular'} onClick={this.handleItemClick} />
            </Menu>
          </Grid.Column>
          <Grid.Column width={12}>
            {this.props.posts.map( post =>
              <Post
                key={post.id}
                post={post}
              />
            )}
          </Grid.Column>
        </Grid>



        <style jsx>{`
          div.App{
            max-width: 998px;
            margin: 25px auto 0;
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
    posts: _.values(state.posts)
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getPosts: () => {
      dispatch(getPosts())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
