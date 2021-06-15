import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import Submission from './components/Submission'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import Error from './components/Error'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState(null)
  const [signed, setSigned] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    const time = (new Date()).getTime()
    const expTime = window.localStorage.getItem('tokenExpiration')
    const parsedTime = JSON.parse(expTime)ç
    if (time >= parsedTime) {
      window.localStorage.removeItem('loggedBloglistUser')
      setSigned(false)
      setUser(null)
    }

    const loggedUserJson = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJson !== null) {
      const userInfo = JSON.parse(loggedUserJson)
      setUser(userInfo)
      setSigned(true)
      blogService.setToken(userInfo.token)
      blogService.getAll().then(blogs => setBlogs(blogs))
    }
  }, [signed])
  
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const userInfo = await loginService.login({
        username, password
      })
      
      blogService.setToken(userInfo.token)
      window.localStorage.setItem('loggedBloglistUser', JSON.stringify(userInfo))
      window.localStorage.setItem('tokenExpiration', (new Date()).getTime() + (1000 * 60 * 60))
      
      setUser(userInfo)
      setSigned(true)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }
  
  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    try {
      blogService
        .createNew(blogObject)
        .then(returnedBlog => setBlogs(blogs.concat(returnedBlog)))
      setMessage('blog added')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage('missing field')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)   
    }
  }

  const blogForm = () => (
    <Togglable buttonLabel='create new blog' ref={blogFormRef}>
      <Submission
        addBlog={addBlog}
      />
    </Togglable>
  )

  return (
    <div>
      {errorMessage !== null
      ? <Error error={errorMessage}/>
      : null}
      {message !== null 
      ? <Notification message={message}/>
      : null}
      {user === null
      ? <div>
          <h2>Log in to the application</h2>
          <Login username={username} password={password} setUsername={setUsername} setPassword={setPassword} submit={handleLogin}/>
        </div>
      : <div>   
          <h2>blogs</h2>
          <h4>{user.name} logged in</h4>
          {blogForm()}
          <div>
            {blogs.map(blog => <Blog key={blog.id} blog={blog}/>)}
          </div>
        </div>
      }
    </div>
  )
}

export default App