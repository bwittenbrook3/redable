import React from 'react'
import { Icon } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { vote } from 'actions'

function Vote({ post, upvote, downvote }) {
  return (
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

      <style jsx>{`
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
      `}</style>
    </div>
  )
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    upvote: (post) => dispatch(vote(post, 'upVote')),
    downvote: (post) => dispatch(vote(post, 'downVote'))
  }
}

export default connect(null, mapDispatchToProps)(Vote)
