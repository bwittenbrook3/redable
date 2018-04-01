import React, { Component } from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { Button, Form, Icon, Dropdown, Message } from 'semantic-ui-react'
import uuid from 'uuid/v4'
import { createPost } from 'actions'

class NewPost extends Component {

  state = {
    title: null,
    author: null,
    category: null,
    body: null,
    errors: []
  }

  handleChange(prop, event) {
    this.setState({[prop]: event.target.value})
  }

  categoryChanged(_, dropdown) {
    this.setState({category: dropdown.value})
  }

  submit() {

    const post = {
      ...this.state,
      id: uuid(),
      timestamp: Date.now(),
      errors: undefined
    }

    const errors = this.validatePost(post)
    this.setState({errors: errors})

    if (errors.length === 0) {
      const { history } = this.props

      this.props.createPost(post)
      .then(post => history.goBack())
    }
  }

  validatePost(post) {
    let errors = []

    if (_.isEmpty(post.title)) {
      errors.push("Title must not be blank")
    }

    if (_.isEmpty(post.author)) {
      errors.push("Author must not be blank")
    }

    if (_.isEmpty(post.category)) {
      errors.push("Category must not be blank")
    }

    if (_.isEmpty(post.body)) {
      errors.push("Author must not be blank")
    }

    return errors
  }

  render() {
    const { errors } = this.state
    const { history, categories } = this.props

    const categoryOptions = categories.map(category => {
      return {
        text: category.name,
        value: category.name
      }
    })

    return (
      <div className="NewPost">
        <a onClick={() => history.goBack()}>
          <Icon name="reply" />back to all posts
        </a>
        <div className="ui divider"></div>
        <h1 className="ui header">
          New Post
        </h1>
        <Form
          error={!_.isEmpty(errors)}
          onSubmit={() => this.submit()}
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
            <label>Title</label>
            <input
              placeholder='Title'
              onChange={this.handleChange.bind(this, 'title')}
            />
          </Form.Field>
          <Form.Field required>
            <label>Author</label>
            <input
              placeholder='Author'
              onChange={this.handleChange.bind(this, 'author')}
            />
          </Form.Field>
          <Form.Field required>
            <label>Category</label>
            <Dropdown
              placeholder='Select a category'
              fluid
              selection
              options={categoryOptions}
              onChange={this.categoryChanged.bind(this)}
            />
          </Form.Field>
          <Form.Field required>
            <label>Body</label>
            <textarea
              placeholder='Body'
              onChange={this.handleChange.bind(this, 'body')}
            />
          </Form.Field>
          <Button primary size='large' type='submit'>Submit</Button>
        </Form>

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


const mapStateToProps = (state) => {
  return {
    categories: _.values(state.categories),
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    createPost: (post) => dispatch(createPost(post)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewPost)
