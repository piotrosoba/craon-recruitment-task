import StateManagement from './StateManagement'
import StateManagementContext from './StateManagementContext'

import AuthState from './subclasses/AuthState'
import TasksState from './subclasses/TasksState'

export default function makeStateManagement() {
  const stateManagement = new StateManagement({
    auth: AuthState,
    tasks: TasksState
  })

  return {
    stateManagement,
    StateManagementProvider: StateManagementContext.Provider
  }
}
