import React from 'react'

import propTypes from 'prop-types'
import TaskItem from '../task/task'
import './task-list.css'

const TaskList = ({ tasks, onDeleted, onToggleComplete, onToggleEdit, updateTaskDescription }) => {
  return (
    <ul className="todo-list">
      {tasks.map(({ id, description, isEditing, ...itemProps }) => (
        <TaskItem
          key={id}
          id={id}
          onDeleted={onDeleted}
          description={description}
          isEditing={isEditing}
          onToggleComplete={() => onToggleComplete(id)}
          onToggleEdit={() => onToggleEdit(id, description)}
          updateTaskDescription={updateTaskDescription}
          {...itemProps}
        />
      ))}
    </ul>
  )
}

TaskList.defaultProps = {
  onToggleComplete: () => {},
  onToggleEdit: () => {},
  onDeleted: () => {},
  updateTaskDescription: () => {},
  tasks: [],
}

TaskList.propTypes = {
  tasks: propTypes.arrayOf(
    propTypes.shape({
      id: propTypes.number.isRequired,
      description: propTypes.string.isRequired,
      isEditing: propTypes.bool.isRequired,
    })
  ).isRequired,
  onDeleted: propTypes.func,
  onToggleComplete: propTypes.func,
  onToggleEdit: propTypes.func,
  updateTaskDescription: propTypes.func,
}

export default TaskList
