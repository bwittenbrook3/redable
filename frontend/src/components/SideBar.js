import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import { connect } from 'react-redux'
import _ from 'lodash'
import { withRouter } from 'react-router-dom'

class SideBar extends Component {

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
      <Menu text vertical>
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
      </Menu>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    categories: _.values(state.categories)
  }
}

export default withRouter(connect(mapStateToProps)(SideBar))
