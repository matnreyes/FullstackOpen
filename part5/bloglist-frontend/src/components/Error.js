import React from 'react'

const Error = ({ error }) => {
  const messageStyle = {
    background: 'lightgrey',
    fontSize: 20,
    fontStyle: 'bold',
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    color: 'red'
  }
  return (
    <div style={messageStyle}>
      {error}
    </div>
  )
}

export default Error