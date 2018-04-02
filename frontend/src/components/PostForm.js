import React, { Component } from 'react'
import { Form, Dropdown, Message, Button } from 'semantic-ui-react'
import _ from 'lodash'
import { connect } from 'react-redux'
import uuid from 'uuid/v4'
import { withRouter } from 'react-router-dom'

const newPost = {
  title: '',
  author: '',
  category: '',
  body: '',
}

class PostForm extends Component {

  state = {
    ...(this.props.post || newPost),
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
      id: (this.state.id || uuid()),
      timestamp: Date.now(),
      errors: undefined
    }

    const errors = this.validatePost(post)
    this.setState({errors: errors})

    if (errors.length === 0) {
      const { history } = this.props

      this.props.save(post)
      .then(post => history.push("/"))
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
      errors.push("Body must not be blank")
    }

    return errors
  }

  render() {
    const { title, author, category, body, errors } = this.state;
    const { categories, post } = this.props

    const categoryOptions = categories.map(category => {
      return {
        text: category.name,
        value: category.name
      }
    })

    return (
      <Form
        className="PostForm"
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
            value={title}
          />
        </Form.Field>
        {_.isEmpty(post) &&
          <Form.Field required>
            <label>Author</label>
            <input
              placeholder='Author'
              onChange={this.handleChange.bind(this, 'author')}
              value={author}
            />
          </Form.Field>
        }
        {_.isEmpty(post) &&
          <Form.Field required>
            <label>Category</label>
            <Dropdown
              placeholder='Select a category'
              fluid
              selection
              options={categoryOptions}
              onChange={this.categoryChanged.bind(this)}
              value={category}
            />
          </Form.Field>
        }
        <Form.Field required>
          <label>Body</label>
          <textarea
            placeholder='Body'
            onChange={this.handleChange.bind(this, 'body')}
            value={body}
          />
        </Form.Field>
        <Button primary size='large' type='submit'>Save</Button>
      </Form>
    )
  }
}

const mapStateToProps = (state) => (
  {
    categories: _.values(state.categories),
  }
)

export default withRouter(connect(mapStateToProps)(PostForm))
