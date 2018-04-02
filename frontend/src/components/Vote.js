import React from 'react'
import { Icon } from 'semantic-ui-react'

const Vote = ({ voteScore, upvote, downvote, small }) => (
  <div className="Vote">
    <Icon
      onClick={() => upvote()}
      name='caret up'
      link
    />
    <span className="voteScore">{voteScore}</span>
    <Icon
      onClick={() => downvote()}
      name='caret down'
      link
    />

    <style jsx>{`
      div.Vote {
        float: left;
        width: 100px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;

        :global(i.caret) {
          font-size: ${small ? '20' : '22'}px;
        }

        .voteScore {
          font-size: ${small ? '16' : '20'}px;
          padding-right: 3px;
        }
      }
    `}</style>
  </div>
)

export default Vote
