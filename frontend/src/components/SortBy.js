import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'

class SortBy extends Component {

  render() {


    return(
      <div className="SortBy">
        <Menu text>
          <Menu.Item header>Sort By</Menu.Item>
          <Menu.Item name='Score' onClick={this.handleItemClick} />
          <Menu.Item name='Date' onClick={this.handleItemClick} />
        </Menu>

        <style jsx>{`
          .SortBy {
            margin-left: 35px;
          }

        `}</style>
      </div>
    )
  }
}

export default SortBy
