import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Comment, Icon, Form, Segment } from 'semantic-ui-react'
import { getPost } from 'actions'
import Moment from 'react-moment'

class Detail extends Component {

  componentDidMount() {
    if (!this.props.post) {
      const { match } = this.props
      this.props.getPost(match.params.id)
    }
  }

  render() {
    const { post, history } = this.props

    return(
      <div className="PostDetail">
        <a onClick={() => history.goBack()}>
          <Icon name="reply" />back to all posts
        </a>

        <Segment>
          <h1 className="ui header">
            {post && post.title}
            <div className="sub header">
              Posted by <b>{post && post.author}</b> at <Moment format="YYYY/MM/DD @ HH:MM">{post && post.timestamp}</Moment>
            </div>
          </h1>

          <p className="ui header">
            {post && post.body}
          </p>
        </Segment>


        <Comment.Group>
          <Comment>
            <Comment.Content>
              <Comment.Author as='a'>Matt</Comment.Author>
              <Comment.Metadata>
                <div>Today at 5:42PM</div>
              </Comment.Metadata>
              <Comment.Text>How artistic!</Comment.Text>
            </Comment.Content>
          </Comment>

          <div className="ui divider"></div>

          <Form reply>
            <Form.Field>
              <label>Author</label>
              <input placeholder='Author' />
            </Form.Field>
            <Form.Field>
              <label>Body</label>
              <textarea
                placeholder='Comment'
              />
            </Form.Field>
            <Button content='Add Comment' labelPosition='left' icon='edit' primary />
          </Form>
        </Comment.Group>

        <style jsx>{`
          div {
            > a {
              cursor: pointer;
            }
          }
        `}</style>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const { match } = ownProps
  const { id } = match.params

  return {
    post: state.posts[id]
  }
}



const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getPost: (id) => dispatch(getPost(id))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Detail)
