import React, { Component } from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { Button, Form, Icon, Dropdown } from 'semantic-ui-react'

class NewPost extends Component {

  state = {
    title: null,
    author: null,
    category: null,
    body: null
  }

  handleChange(prop, event) {
    this.setState({[prop]: event.target.value})
  }

  categoryChanged(_, dropdown) {
    this.setState({category: dropdown.value})
  }

  render() {
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
        <Form>
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

export default connect(mapStateToProps)(NewPost)
