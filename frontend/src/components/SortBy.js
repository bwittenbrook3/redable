import React from 'react'
import { Menu } from 'semantic-ui-react'
import { sortBy } from 'actions'
import { connect } from 'react-redux'

const SortBy = ({ sortBy, sortedBy }) => (
  <div className="SortBy">
    <Menu text>
      <Menu.Item header>Sort By</Menu.Item>
      <Menu.Item
        name='Score'
        active={sortedBy === 'voteScore'}
        onClick={() => sortBy('voteScore')}
      />
      <Menu.Item
        name='Date'
        active={sortedBy === 'timestamp'}
        onClick={() => sortBy('timestamp')}
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
