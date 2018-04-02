import React, { Component } from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { Icon } from 'semantic-ui-react'
import { createPost, getCategories } from 'actions'

import PostForm from 'components/PostForm'

class NewPost extends Component {

  componentDidMount() {
    this.props.getCategories()
  }

  render() {
    const { history, createPost } = this.props

    return (
      <div className="EditPost">
        <a onClick={() => history.push('/')}>
          <Icon name="reply" />back to all posts
        </a>
        <div className="ui divider"></div>
        <PostForm
          save={createPost}
        />
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    categories: _.values(state.categories),
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    createPost: (post) => dispatch(createPost(post)),
    getCategories: () => dispatch(getCategories())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewPost)
