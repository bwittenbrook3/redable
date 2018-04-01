import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getPost } from 'actions'

class EditPost extends Component {

  componentDidMount() {
    this.props.getPost()
  }

  render() {
    return (
      <div className="EditPost">
        Edit
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch, { match }) => (
  {
    getPost: () => dispatch(getPost(match.params.id))
  }
)

export default connect(null, mapDispatchToProps)(EditPost)
