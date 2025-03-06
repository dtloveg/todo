import React, { Component } from 'react'

import NewTaskForm from '../new-task-form'
import TaskList from '../task-list'
import Footer from '../footer'

export default class App extends Component {
  maxId = 100
  state = {
    tasks: [],
    filter: 'All',
  }
  createTodoTask(description) {
    return {
      description,
      isCompleted: false,
      isEditing: false,
      id: this.maxId++,
      createdAt: new Date().toISOString(),
      checked: false,
    }
  }

  deleteTask = (id) => {
    this.setState(({ tasks }) => {
      const idx = tasks.findIndex((el) => el.id === id)
      const newArray = [...tasks.slice(0, idx), ...tasks.slice(idx + 1)]
      return {
        tasks: newArray,
      }
    })
  }

  addTask = (text) => {
    if (!text.trim()) {
      return
    }
    const newTask = this.createTodoTask(text)

    this.setState(({ tasks }) => {
      const newArray = [...tasks, newTask]
      return {
        tasks: newArray,
      }
    })
  }

  onToggleComplete = (id) => {
    this.setState(({ tasks }) => {
      const idx = tasks.findIndex((el) => el.id === id)
      const oldTask = tasks[idx]
      const newTask = { ...oldTask, isCompleted: !oldTask.isCompleted }
      const newArray = [...tasks.slice(0, idx), newTask, ...tasks.slice(idx + 1)]
      return {
        tasks: newArray,
      }
    })
  }

  onToggleEdit = (id) => {
    this.setState(({ tasks }) => {
      const idx = tasks.findIndex((el) => el.id === id)
      const oldTask = tasks[idx]
      const newTask = { ...oldTask, isEditing: !oldTask.isEditing }
      const newArray = [...tasks.slice(0, idx), newTask, ...tasks.slice(idx + 1)]
      return {
        tasks: newArray,
      }
    })
  }

  updateTaskDescription = (id, newDescription) => {
    this.setState(({ tasks }) => {
      const idx = tasks.findIndex((el) => el.id === id)
      const oldTask = tasks[idx]
      const newTask = { ...oldTask, description: newDescription, isEditing: false }
      const newArray = [...tasks.slice(0, idx), newTask, ...tasks.slice(idx + 1)]
      return {
        tasks: newArray,
      }
    })
  }

  setFilter = (filter) => {
    this.setState({ filter })
  }

  clearCompleted = () => {
    this.setState(({ tasks }) => {
      const newArray = tasks.filter((task) => !task.isCompleted)
      return {
        tasks: newArray,
      }
    })
  }
  render() {
    const { tasks, filter } = this.state

    const filteredTasks = tasks.filter((task) => {
      if (filter === 'Active') return !task.isCompleted
      if (filter === 'Completed') return task.isCompleted
      return true
    })
    const tasksCompletedCount = this.state.tasks.filter((el) => el.isCompleted).length
    const tasksCount = this.state.tasks.length - tasksCompletedCount

    return (
      <section className="todoapp">
        <NewTaskForm onTaskAdded={this.addTask} />
        <TaskList
          tasks={filteredTasks}
          onDeleted={this.deleteTask}
          onToggleComplete={this.onToggleComplete}
          onToggleEdit={this.onToggleEdit}
          updateTaskDescription={this.updateTaskDescription}
        />

        <Footer
          tasksCount={tasksCount}
          setFilter={this.setFilter}
          filter={filter}
          clearCompleted={this.clearCompleted}
        />
      </section>
    )
  }
}
