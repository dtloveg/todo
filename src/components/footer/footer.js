import React from 'react'
import './footer.css'
import propTypes from 'prop-types'

import TasksFilter from '../tasks-filter'

const Footer = ({ tasksCount, setFilter, filter, clearCompleted }) => {
  return (
    <footer className="footer">
      <span className="todo-count">{tasksCount} items left</span>
      <TasksFilter setFilter={setFilter} filter={filter} />
      <button className="clear-completed" onClick={clearCompleted}>
        Clear completed
      </button>
    </footer>
  )
}

Footer.propTypes = {
  tasksCount: propTypes.number,
  setFilter: propTypes.func,
  filter: propTypes.oneOf(['All', 'Active', 'Completed']).isRequired,
  clearCompleted: propTypes.func,
}

Footer.defaultProps = {
  tasksCount: 0,
  setFilter: () => {},
  clearCompleted: () => {},
  filter: 'All',
}

export default Footer
