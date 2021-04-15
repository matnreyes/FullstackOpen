import React from 'react'

const Message = ({ message}) => {
    const messageStyle = {
        color: 'green',
        background: 'lightgrey',
        fontSize: 20,
        fontStyle: 'bold',
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }

    if (message === null) {
        return null
    }

    return (
        <div style={messageStyle}>
            {message}
        </div>
    )
}

export default Message