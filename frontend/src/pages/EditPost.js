import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getPost, editPost } from 'actions'
import { Icon } from 'semantic-ui-react'

import PostForm from 'components/PostForm'

class EditPost extends Component {

  componentDidMount() {
    this.props.getPost()
  }

  render() {
    const { post, editPost, history } = this.props

    return (
      <div className="EditPost">
        <a onClick={() => history.goBack()}>
          <Icon name="reply" />back to all posts
        </a>
        <div className="ui divider"></div>
        {post &&
          <PostForm
            post={post}
            save={editPost}
          />
        }
      </div>
    )
  }
}

const mapStateToProps = (state, { match }) => (
  {
    post: state.posts[match.params.id]
  }
)

const mapDispatchToProps = (dispatch, { match }) => (
  {
    getPost: () => dispatch(getPost(match.params.id)),
    editPost: (post) => dispatch(editPost(match.params.id, post))
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(EditPost)
