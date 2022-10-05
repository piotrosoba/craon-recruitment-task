import { EventEmitter } from 'eventemitter3'

export default class StateManagement extends EventEmitter {
  constructor(subclasses) {
    super()
    Object.defineProperty(this, 'state', {
      value: {},
      writable: false
    })

    Object.entries(subclasses).forEach(([key, ManagerClass]) => this.addManager(key, ManagerClass))
  }

  addManager(key, ManagerClass) {
    Object.defineProperty(this.state, key, {
      value: {},
      writable: false
    })
    this[key] = new ManagerClass(this, this.state[key])
  }

  dispatch = action => {
    this.emit(action.type, action)
  }
}
