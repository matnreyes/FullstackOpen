import React from 'react'

const Login = ({ username, password, setUsername, setPassword }) => (
  <div>
    <h2>Login into the application</h2>
    <form>
      <div>
        username:
        <input
        type="text"
        value={username}
        onChange={({target}) => setUsername(target.value)}
        />
      </div>
      <div>
        password:
        <input
        type="password"
        value={password}
        onChange={({target}) => setPassword(target.value)}
        />
        <button type="submit">login</button> 
      </div>
    </form>
  </div>
)

export default Login