import axios from 'axios'
import actions from '../actions'

export default class AuthState {
  constructor(stateManagement, state) {
    this.stateManagement = stateManagement
    this.state = state

    this.setInitialState()
    this.tryAutoLogin()
    this.setlogoutOn401()
    stateManagement.on(actions.CLEAN_STATE, this.setInitialState, this)
    stateManagement.on(actions.AUTH_LOGOUT, this.logout, this)
    stateManagement.on(actions.LOG_IN_REQUEST, this.logInRequest, this)
  }

  setInitialState() {
    Object.assign(this.state, {
      isLogged: false,
      loading: false,
      errorMessage: '',
      user: null
    })
  }

  setToken(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`
  }

  tryAutoLogin() {
    this.state.user = JSON.parse(localStorage.getItem('user')) || null
    if (this.state.user) {
      this.state.isLogged = true
      this.setToken(this.state.user.token)
    }
  }

  async logInRequest({ username, password }) {
    this.state.loading = true
    this.state.errorMessage = ''
    this.stateManagement.dispatch({ type: actions.AUTH_UPDATE })

    try {
      const response = await axios.post('https://dummyjson.com/auth/login', { username, password })
      this.state.user = response.data
      this.state.isLogged = true
      this.state.errorMessage = ''
      this.setToken(this.state.user.token)

      localStorage.setItem('user', JSON.stringify(this.state.user))
    } catch (err) {
      this.state.errorMessage = err.response.data.message
    }

    this.state.loading = false
    this.stateManagement.dispatch({ type: actions.AUTH_UPDATE })
  }

  logout() {
    localStorage.removeItem('user')
    this.setToken(null)
    this.stateManagement.dispatch({ type: actions.CLEAN_STATE })
    this.stateManagement.dispatch({ type: actions.AUTH_UPDATE })
  }

  setlogoutOn401() {
    axios.interceptors.response.use(
      response => response,
      err => {
        if (this.state.isLogged && err.response.status === 401) {
          this.logout()
        }
        return Promise.reject(err)
      }
    )
  }
}
