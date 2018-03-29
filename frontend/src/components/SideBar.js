import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import { connect } from 'react-redux'
import _ from 'lodash'

class SideBar extends Component {

  state = {
    activeCategory: null
  }

  handleItemClick = (e, { name }) => {
    this.setState({
      activeCategory: name === 'All' ? null : name
    })
  }

  render() {
    const { activeCategory } = this.state
    const { categories } = this.props

    return (
      <Menu text vertical>
        <Menu.Item header>Categories</Menu.Item>

        <Menu.Item
          name='All'
          active={activeCategory === null}
          onClick={this.handleItemClick}
        />

        {categories.map(category =>
          <Menu.Item
            key={category.name}
            name={category.name}
            active={activeCategory === category.name} onClick={this.handleItemClick}
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

export default connect(mapStateToProps)(SideBar)
