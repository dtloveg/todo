import React, { Component } from 'react'
import './tasks-filter.css'
import propTypes from 'prop-types'

export default class TasksFilter extends Component {
  render() {
    const { filter, setFilter } = this.props

    return (
      <ul className="filters">
        <li>
          <button className={filter === 'All' ? 'selected' : ''} onClick={() => setFilter('All')}>
            All
          </button>
        </li>
        <li>
          <button className={filter === 'Active' ? 'selected' : ''} onClick={() => setFilter('Active')}>
            Active
          </button>
        </li>
        <li>
          <button className={filter === 'Completed' ? 'selected' : ''} onClick={() => setFilter('Completed')}>
            Completed
          </button>
        </li>
      </ul>
    )
  }
}

TasksFilter.propTypes = {
  setFilter: propTypes.func,
  filter: propTypes.oneOf(['All', 'Active', 'Completed']).isRequired,
}

TasksFilter.defaultProps = {
  setFilter: () => {},
  filter: 'All',
}
