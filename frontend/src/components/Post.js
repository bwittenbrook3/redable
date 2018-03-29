import React, { Component } from 'react'
import { Label, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { vote } from 'actions'

class Post extends Component {

  render() {
    const { post, upvote, downvote } = this.props

    return (
      <div className="post">
        <div className="votes">
          <Icon
            onClick={() => upvote(post)}
            name='caret up'
            link
          />
          <span className="voteScore">{post.voteScore}</span>
          <Icon
            onClick={() => downvote(post)}
            name='caret down'
            link
          />
        </div>
        <div className="content">
          <Link to={`/${post.category}/${post.id}`}>
            <h1 className="ui header">
              {post.title}
              <div className="sub header">{post.author}</div>
            </h1>
          </Link>
          <Link to={`/${post.category}/${post.id}`}>
            <Label
              content={post.commentCount}
              icon="comment"
            />
          </Link>
        </div>

        <div className="clearfix"></div>



        <style jsx>{`
          div.post {
            clear: both;
            margin: 20px 20px;
          }

          h1.ui.header {
            margin-bottom: 5px;
          }

          div.votes {
            float: left;
            width: 100px;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;

            :global(i.caret) {
              font-size: 22px;
            }

            .voteScore {
              font-size: 20px;
              padding-right: 3px;
            }
          }

          div.content {
            float: left;
            margin: 5px 0 0 10px;
          }

          .clearfix {
            clear: both;
          }
        `}</style>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    upvote: (post) => dispatch(vote(post, 'upVote')),
    downvote: (post) => dispatch(vote(post, 'downVote'))
  }
}


export default connect(null, mapDispatchToProps)(Post)
