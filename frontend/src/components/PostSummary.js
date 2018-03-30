import React from 'react'
import { Button, Label } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'

import Vote from './Vote'

function PostSummary({ post }) {

  return (
    <div className="post">
      <Vote post={post} />
      <div className="content">
        <Link to={`/${post.category}/${post.id}`}>
          <h1 className="ui header">
            {post.title}
            <div className="sub header">
              Posted by <b>{post.author}</b> at <Moment format="YYYY/MM/DD @ HH:MM">{post.timestamp}</Moment>
            </div>
          </h1>
        </Link>

        <div className="actions">
          <Link to={`/${post.category}/${post.id}`}>
            <Label
              content={post.commentCount}
              icon="comment"
            />
          </Link>
          <Button
            basic
            content="edit"
            size="mini"
          />
          <Button
            basic
            content="delete"
            size="mini"
          />
        </div>
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

        div.content {
          float: left;
          margin: 5px 0 0 10px;
        }

        div.actions :global(.ui.button) {
          margin-left: 15px;
        }

        .clearfix {
          clear: both;
        }
      `}</style>
    </div>
  )
}

export default PostSummary
