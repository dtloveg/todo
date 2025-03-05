import React, { Component } from 'react'
import './new-task-form.css'
import propTypes from 'prop-types'

export default class NewTaskForm extends Component {
  state = {
    description: '',
  }
  onDescriptionChange = (e) => {
    this.setState({
      description: e.target.value,
    })
  }
  onSubmit = (e) => {
    e.preventDefault()
    this.props.onTaskAdded(this.state.description)
    this.setState({
      description: '',
    })
  }
  render() {
    return (
      <form className="header" onSubmit={this.onSubmit}>
        <h1>todos</h1>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus
          onChange={this.onDescriptionChange}
          value={this.state.description}
        />
      </form>
    )
  }
}

NewTaskForm.defaultProps = {
  onTaskAdded: () => {},
}

NewTaskForm.propTypes = {
  onTaskAdded: propTypes.func,
}
