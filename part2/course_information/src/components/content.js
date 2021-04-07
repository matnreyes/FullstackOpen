import Part from './part'
import Total from './total'

const Content = ({parts}) => {
    return (
      <div>
        {parts.map(part => <Part key={part.id} name={part.name} exercise={part.exercises}/>)}
        <Total parts={parts}/>
      </div>
    )
  }

export default Content