import axios from 'axios'
import actions from '../actions'

export default class TasksState {
  constructor(stateManagement, state) {
    this.stateManagement = stateManagement
    this.state = state

    this.setInitialState()
    stateManagement.on(actions.CLEAN_STATE, this.setInitialState, this)
    stateManagement.on(actions.GET_TASKS, this.getTasks, this)
    stateManagement.on(actions.TOGGLE_TASK, this.requestToggleTask, this)
    stateManagement.on(actions.DELETE_TASK, this.requestDeleteTask, this)
    stateManagement.on(actions.ADD_TASK, this.requestAddTask, this)
  }

  update() {
    this.stateManagement.dispatch({ type: actions.TASKS_UPDATE })
  }

  setInitialState() {
    Object.assign(this.state, {
      data: [],
      loading: true
    })
  }

  sortByCompleted() {
    this.state.data.sort((a, b) => (b.completed ? -1 : 1))
  }

  async getTasks() {
    this.loading = true
    this.update()

    try {
      const url = 'https://dummyjson.com/todos/user/' + this.stateManagement.state.auth.user.id + '?limit=100'
      const response = await axios.get(url)
      this.state.data = response.data.todos
      this.sortByCompleted()
      this.state.loading = false
    } catch (err) {
      console.log(err)
    }

    this.update()
  }

  toggleTask(task) {
    task.completed = !task.completed
    this.sortByCompleted()
    this.update()
  }

  deleteTask(task) {
    this.state.data = this.state.data.filter(t => t.id !== task.id)
    this.update()
  }

  addTask(task) {
    this.state.data = [task, ...this.state.data]
    this.sortByCompleted()
    this.update()
  }

  async requestToggleTask({ task }) {
    this.toggleTask(task)

    try {
      await axios.put('https://dummyjson.com/todos/' + task.id, { completed: task.completed })
    } catch (err) {
      // Because new added task doesn't exist in api
      if (err.response.status === 404) return
      this.toggleTask(task)
      this.stateManagement.dispatch({ type: actions.MAKE_ERROR_MESSAGE, text: 'Cannot update task. Try again later.' })
    }
  }

  requestAddTask({ task }) {
    this.addTask(task)

    try {
      axios.post('https://dummyjson.com/todos/add', task)
      // There should be task id override but dummyjson returns always same id.
    } catch (err) {
      this.deleteTask(task)
      this.stateManagement.dispatch({ type: actions.MAKE_ERROR_MESSAGE, text: 'Cannot add task. Try again later.' })
    }
  }

  async requestDeleteTask({ task }) {
    this.deleteTask(task)
    try {
      await axios.delete('https://dummyjson.com/todos/' + task.id)
    } catch (err) {
      // Because new added task doesn't exist in api
      if (err.response.status === 404) return
      this.addTask(task)
      this.stateManagement.dispatch({ type: actions.MAKE_ERROR_MESSAGE, text: 'Cannot delete task. Try again later.' })
    }
  }
}
