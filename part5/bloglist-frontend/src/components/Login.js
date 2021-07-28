import React from 'react'
import PropTypes from 'prop-types'

const Login = ({ username, password, setUsername, setPassword, submit }) => (
  <div>
    <form onSubmit={submit} className="login-form">
      <div>
        username:
        <input
          id="username-input"
          type="text"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password:
        <input
          id="password-input"
          type="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit" className="login-button">Login</button>
    </form>
  </div>
)

Login.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  setUsername: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired
}

export default Login