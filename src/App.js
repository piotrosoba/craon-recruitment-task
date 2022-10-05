import connect from './StateManagement/connect'
import actions from './StateManagement/actions'

import Auth from './views/Auth'
import Header from './views/Header'
import Tasks from './views/Tasks'

const App = ({ globalState }) => {
  if (globalState.auth.isLogged) {
    return (
      <>
        <Header />
        <Tasks />
      </>
    )
  }

  return <Auth />
}

export default connect([actions.AUTH_UPDATE])(App)

