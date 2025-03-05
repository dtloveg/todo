import React, { Component } from 'react'
import { formatDistanceToNow } from 'date-fns'
import propTypes from 'prop-types'

export default class TaskItem extends Component {
  state = {
    editText: this.props.description,
  }

  onEditChange = (e) => {
    this.setState({
      editText: e.target.value,
    })
  }

  onKeyPress = (e) => {
    if (e.key === 'Enter') {
      const { id, updateTaskDescription } = this.props
      updateTaskDescription(id, this.state.editText)
    }
  }
  render() {
    const { description, onDeleted, id, onToggleComplete, isCompleted, isEditing, createdAt } = this.props

    let classNames = 'task'
    if (isCompleted) {
      classNames += ' completed'
    }
    if (isEditing) {
      classNames += ' editing'
    }
    return (
      <li className={classNames}>
        <div className="view">
          <input className="toggle" type="checkbox" checked={isCompleted} onChange={() => onToggleComplete(id)} />
          <label>
            <span className="description" onClick={onToggleComplete}>
              {description}
            </span>
            <span className="created">{formatDistanceToNow(new Date(createdAt))} </span>
          </label>
          <button className="icon icon-edit" onClick={() => this.props.onToggleEdit(id)}></button>
          <button className="icon icon-destroy" onClick={() => onDeleted(id)}></button>
        </div>
        {isEditing && (
          <input
            type="text"
            className="edit"
            value={this.state.editText}
            onChange={this.onEditChange}
            onKeyDown={this.onKeyPress}
          />
        )}
      </li>
    )
  }
}

TaskItem.propTypes = {
  onDeleted: propTypes.func,
  onToggleComplete: propTypes.func,
  onEditChange: propTypes.func,
  onKeyPress: propTypes.func,
  createdAt: propTypes.func,
  onToggleEdit: propTypes.func,
  description: propTypes.string.isRequired,
  id: propTypes.number.isRequired,
  isCompleted: propTypes.bool.isRequired,
  isEditing: propTypes.bool.isRequired,
  updateTaskDescription: propTypes.func,
}

TaskItem.defaultProps = {
  onToggleEdit: () => {},
  onDeleted: () => {},
  onToggleComplete: () => {},
  onEditChange: () => {},
  onKeyPress: () => {},
  createdAt: () => {},
  updateTaskDescription: () => {},
  id: 0,
  isCompleted: false,
  isEditing: false,
}
