import React from 'react'
import Content from './content'

const Course = ({course}) => {
    return (
        <div>
            <h2>{course.name}</h2>
            <Content parts={course.parts}/>
        </div>
    )
}

export default Course