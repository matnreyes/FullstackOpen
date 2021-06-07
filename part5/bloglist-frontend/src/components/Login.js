import react from 'react'

const Login = ({ username, password, setUsername, setPassword, submit }) => (
<div>
  <form onSubmit={submit}>
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
      </div>
      <button type="submit">Login</button>
  </form>
</div>
)

export default Login