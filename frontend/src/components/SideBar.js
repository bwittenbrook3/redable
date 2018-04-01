import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import { connect } from 'react-redux'
import _ from 'lodash'
import { withRouter } from 'react-router-dom'
import { getCategories } from 'actions'

class SideBar extends Component {

  componentDidMount() {
    this.props.getCategories();
  }

  handleItemClick = (e, { name }) => {

    // Change to the selected category
    const { push } = this.props.history
    if (name === 'All') {
      push({
        pathname: '/',
        state: {}
      })
    } else {
      push({
        pathname: `/${name}`,
        state: {}
      })
    }
  }

  render() {
    const { match, categories } = this.props

    const { category } = match.params

    const activeCategory =
      category === 'All' ? undefined : category

    return (
      <Menu text vertical className="category-menu">
        <Menu.Item header>Categories</Menu.Item>

        <Menu.Item
          name='All'
          active={activeCategory === undefined}
          onClick={this.handleItemClick}
        />

        {categories.map(category =>
          <Menu.Item
            key={category.name}
            name={category.name}
            active={activeCategory === category.name}
            onClick={this.handleItemClick}
          />
        )}

        <style jsx global>{`
          .category-menu a.item {
            font-size: 22px;

            &:hover {
              color: palevioletred !important;
            }

            &.active {
              color: palevioletred !important;
              text-decoration: underline;
            }
          }
        `}</style>
      </Menu>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    categories: _.values(state.categories)
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getCategories: () => dispatch(getCategories())
  }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SideBar))
