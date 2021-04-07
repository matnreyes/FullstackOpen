import React from 'react'

const Total = ({parts}) => {
    const totalAmount = parts.reduce((sum, part) => sum + part.exercises, 0)
    return (
        <h4> total of {totalAmount} exercises </h4>
    )
}

export default Total