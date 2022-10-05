import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import 'antd/dist/antd.min.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { message } from 'antd'

import makeStateManagement from './StateManagement/makeStateManagement'
import actions from './StateManagement/actions'

const { stateManagement, StateManagementProvider } = makeStateManagement()

stateManagement.on(actions.MAKE_ERROR_MESSAGE, ({ text }) => {
  message.error(text)
})

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <StateManagementProvider value={stateManagement}>
      <App />
    </StateManagementProvider>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()

