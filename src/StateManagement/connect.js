import React from 'react'
import StateManagementContext from './StateManagementContext'

function useForceUpdate() {
  const update = React.useState(false)[1]
  const forceUpdate = React.useCallback(() => update(s => !s), [update])
  return forceUpdate
}

const connect = (refreshEventsList = []) => {
  if (!Array.isArray(refreshEventsList)) {
    console.warn('StateManagement connect first argument must be array with re-render component actions.')
    refreshEventsList = []
  }

  return Component => {
    return React.forwardRef((props, ref) => {
      const stateManagement = React.useContext(StateManagementContext)
      const forceUpdate = useForceUpdate()
      React.useEffect(() => {
        refreshEventsList.forEach(event => stateManagement.on(event, forceUpdate))
        return () => refreshEventsList.forEach(event => stateManagement.off(event, forceUpdate))
      }, [stateManagement, forceUpdate])

      return <Component ref={ref} {...props} globalState={stateManagement.state} dispatch={stateManagement.dispatch} />
    })
  }
}

export default connect
