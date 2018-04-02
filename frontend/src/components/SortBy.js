import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import { sortBy } from 'actions'
import { connect } from 'react-redux'

class SortBy extends Component {

  render() {

    return(
      <div className="SortBy">
        <Menu text>
          <Menu.Item header>Sort By</Menu.Item>
          <Menu.Item
            name='Score'
            active={this.props.sortedBy === 'voteScore'}
            onClick={() => this.props.sortBy('voteScore')}
          />
          <Menu.Item
            name='Date'
            active={this.props.sortedBy === 'timestamp'}
            onClick={() => this.props.sortBy('timestamp')}
          />
        </Menu>

        <style jsx global>{`

          .SortBy {
            margin-left: 100px;
          }

          .SortBy .ui.text.menu {


            font-size: 18px;

            a.item {

              &:hover {
                color: palevioletred !important;
              }

              &.active {
                color: palevioletred !important;
                text-decoration: underline;
              }
            }
          }
        `}</style>
      </div>
    )
  }
}

const mapStateToProps = (state, _) => {
  return {
    sortedBy: state.sortBy,
  }
}


const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    sortBy: (item) => dispatch(sortBy(item)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SortBy)
