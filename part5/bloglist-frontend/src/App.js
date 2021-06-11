import React, { useState, useEffect } from 'react'
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
  const [author, setAuthor] = useState('')
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJson !== null) {
      const userInfo = JSON.parse(loggedUserJson)
      setUser(userInfo)
      blogService.setToken(userInfo.token)
      blogService.getAll().then(blogs => setBlogs(blogs))
    }
  }, user)

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const userInfo = await loginService.login({
        username, password
      })

      blogService.setToken(userInfo.token)
      window.localStorage.setItem('loggedBloglistUser', JSON.stringify(userInfo))

      setUser(userInfo)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const newBlog = await blogService.createNew({ title, author, url })
      
      setMessage(`${title} has been added`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)

      setTitle('')
      setAuthor('')
      setUrl('')
      setBlogs(blogs.concat(newBlog))
    } catch (exception) {
      setErrorMessage('missing field')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)   
    }
    
  }

  const blogForm = () => (
    <Togglable buttonLabel='create new blog'>
      <h2>Create new</h2>
      <Submission
        title={title}
        setTitle={setTitle}
        author={author}
        setAuthor={setAuthor}
        url={url}
        setUrl={setUrl}
        submit={handleSubmit}
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