import React, { Component } from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { Button, Grid } from 'semantic-ui-react'

import PostSummary from 'components/PostSummary'
import SideBar from 'components/SideBar'
import SortBy from 'components/SortBy'

class List extends Component {

  render() {
    const { history, match, allPosts } = this.props
    const { category } = match.params

    const postsToDisplay =
      _.sortBy(allPosts, [this.props.sortBy])
      .filter(post => post.category === category || !category)
      .reverse()

    return(
      <div className="ListPage">
        <Grid>
          <Grid.Column width={4}>
            <SideBar />
          </Grid.Column>
          <Grid.Column width={12}>
            <SortBy />

            {postsToDisplay.map( post =>
              <PostSummary
                key={post.id}
                post={post}
              />
            )}
            
            <Button
              className="new-post-button"
              primary
              size="large"
              content="New Post"
              onClick={() => history.push('/new')}
            />
          </Grid.Column>
        </Grid>

        <style jsx>{`
          div {

            :global(.new-post-button) {
              margin-left: 130px;
            }

          }
        `}</style>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    allPosts: _.values(state.posts),
    sortBy: state.sortBy
  }
}

export default connect(mapStateToProps)(List);
