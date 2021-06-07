import React, { useState } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const userInfo = await loginService.login({
        username, password
      })

      blogService.setToken(userInfo.token)
      window.localStorage.setItem(
        'loggedBloglistUser', JSON.stringify(user)
      )

      setUsername('')
      setPassword('')
      setUser(user)

      blogService.getAll().then(blogs =>
        setBlogs(blogs))
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  return (
    <div>
      {user === null
      ? <Login username={username} password={password} setUsername={setUsername} setPassword={setPassword} submit={handleLogin}/>
      : blogs.map(blog =>
        <Blog key={blog.id} blog={blog}/>
        )}
    </div>
  )
}

export default App