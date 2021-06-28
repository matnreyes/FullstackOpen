import React from 'react'

const Notification = ({ message }) => {
  const messageStyle = {
    background: 'lightgrey',
    fontSize: 20,
    fontStyle: 'bold',
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    color: 'green'
  }

  return (
    <div style={messageStyle}>
      {message}
    </div>
  )
}

export default Notification