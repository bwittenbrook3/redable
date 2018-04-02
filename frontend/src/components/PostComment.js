import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Comment, Form } from 'semantic-ui-react'
import Moment from 'react-moment'
import { deleteComment, voteOnComment, updateComment } from 'actions'

import Vote from './Vote'

class PostComment extends Component {
  state = {
    body: this.props.comment.body,
    isEditing: false
  }

  toggleEdit() {
    const isEditing = !this.state.isEditing
    this.setState({isEditing})
  }

  handleChange(e) {
    this.setState({ body: e.target.value})
  }

  submit() {
    this.props.updateComment(this.state.body)
    .then(() => this.setState({ isEditing: false}) )
  }

  render() {
    const { comment, upvote, downvote } = this.props
    const { body, isEditing } = this.state

    return (
      <Comment className="PostComment">

        <Vote
          small
          voteScore={comment.voteScore}
          upvote={upvote}
          downvote={downvote}
        />

        <Comment.Content>
          <Comment.Author as="span">{comment.author}</Comment.Author>
          <Comment.Metadata>
            <Moment format="MMMM Do YYYY, h:mm a">{comment.timestamp}</Moment>
          </Comment.Metadata>
          <Comment.Actions>
            <Comment.Action
              content="Edit"
              onClick={() => this.toggleEdit()}
            />
            <Comment.Action
              content="Delete"
              onClick={() => this.props.deleteComment()}
            />
          </Comment.Actions>
          { isEditing
            ? <Form onSubmit={() => this.submit()}>
              <Form.Field>
                <textarea
                  onChange={this.handleChange.bind(this)}
                  value={body}
                />
              </Form.Field>
              <Button primary size='small' type='submit'>Update</Button>
            </Form>
            : <Comment.Text>{comment.body}</Comment.Text>
          }
        </Comment.Content>

        <style jsx global>{`
          .PostComment {
            .text{
              white-space: pre;
              padding-left: 100px;
            }
          }
        `}</style>
      </Comment>
    )
  }
}

const mapDispatchToProps = (dispatch, { comment }) => (
  {
    upvote: () => dispatch(voteOnComment(comment, 'upVote')),
    downvote: () => dispatch(voteOnComment(comment, 'downVote')),
    updateComment: (body) => dispatch(updateComment(comment.id, body)),
    deleteComment: () => dispatch(deleteComment(comment))
  }
)

export default connect(null, mapDispatchToProps)(PostComment)
