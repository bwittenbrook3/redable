import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Form, Message } from 'semantic-ui-react'
import uuid from 'uuid/v4'
import _ from 'lodash'
import { createComment } from 'actions'

class NewComment extends Component {

  state = {
    author: '',
    body: '',
    errors: []
  }

  handleChange(prop, event) {
    this.setState({[prop]: event.target.value})
  }

  submit() {
    const comment = {
      ...this.state,
      parentId: this.props.parentId,
      timestamp: Date.now(),
      id: uuid()
    }

    const errors = this.validateComment(comment);
    this.setState({errors: errors})

    if (errors.length === 0) {
      this.props.createComment(comment)
      this.setState({author: '', body: ''})
    }
  }

  validateComment(comment) {
    let errors = []

    if (_.isEmpty(comment.author)) {
      errors.push("Author must not be blank")
    }

    if (_.isEmpty(comment.body)) {
      errors.push("Body must not be blank")
    }

    return errors
  }

  render() {
    const { author, body, errors } = this.state

    return(
      <div className="NewComment">
        <h3 className="ui header"> New Comment</h3>
        <Form
          reply
          onSubmit={() => this.submit()}
          error={!_.isEmpty(errors)}
        >
          <Message
            error
            onDismiss={() => this.setState({errors: []})}
          >
            <Message.Header>
              Error
            </Message.Header>
            <ul>
              {errors.map( (error, index) =>
                <li key={index}>{error}</li>
              )}
            </ul>
          </Message>
          <Form.Field required>
            <label>Author</label>
            <input
              placeholder='Author'
              onChange={this.handleChange.bind(this, 'author')}
              value={author}
            />
          </Form.Field>
          <Form.Field required>
            <label>Body</label>
            <textarea
              placeholder='Comment'
              onChange={this.handleChange.bind(this, 'body')}
              value={body}
            />
          </Form.Field>
          <Button
            content='Add Comment'
            labelPosition='left'
            icon='edit'
            primary
          />
        </Form>

        <style jsx>{`
          div {
            margin-top: 40px;
          }
        `}</style>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    createComment: comment => dispatch(createComment(comment)),
  }
}


export default connect(null, mapDispatchToProps)(NewComment)
