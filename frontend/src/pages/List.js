import React, { Component } from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { Grid } from 'semantic-ui-react'

import Post from 'components/Post'
import SideBar from 'components/SideBar'

class List extends Component {

  render() {
    const { match, allPosts } = this.props;
    const { category } = match.params;

    let postsToDisplay =
      allPosts.filter(post => post.category === category || !category)

    return(
      <div className="ListPage">
        <Grid>
          <Grid.Column width={4}>
            <SideBar />
          </Grid.Column>
          <Grid.Column width={12}>
            {postsToDisplay.map( post =>
              <Post
                key={post.id}
                post={post}
              />
            )}
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    allPosts: _.values(state.posts),
    categories: _.values(state.categories)
  }
}

export default connect(mapStateToProps)(List);
