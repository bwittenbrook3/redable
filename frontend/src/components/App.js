import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getPosts, getCategories } from 'actions'
import { colors } from 'styles'
import _ from 'lodash'
import Post from './Post'
import { Grid, Menu } from 'semantic-ui-react'

class App extends Component {

  state = {
    activeCategory: null
  }

  componentDidMount() {
    this.props.getPosts();
    this.props.getCategories();
  }

  handleItemClick = (e, { name }) => {
    this.setState({
      activeCategory: name === 'All' ? null : name
    })
  }

  render() {
    const { activeCategory } = this.state
    const { categories, posts } = this.props

    return (
      <div className="App">


        <Grid>
          <Grid.Column width={4}>
            <Menu text vertical>
              <Menu.Item header>Categories</Menu.Item>

              <Menu.Item
                name='All'
                active={activeCategory === null}
                onClick={this.handleItemClick}
              />

              {categories.map(category =>
                <Menu.Item
                  key={category.name}
                  name={category.name}
                  active={activeCategory === category.name} onClick={this.handleItemClick}
                />
              )}
            </Menu>
          </Grid.Column>
          <Grid.Column width={12}>
            {posts.map( post =>
              <Post
                key={post.id}
                post={post}
              />
            )}
          </Grid.Column>
        </Grid>



        <style jsx>{`
          :global(body) {
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
    posts: _.values(state.posts),
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
