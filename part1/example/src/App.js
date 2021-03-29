import React from 'react'
const Hello = (props) => {  
  return (    
    <div>      
      <p>Hello {props.name}, you are {props.age} years old 
      </p>    
    </div>  
  )
}

const Footer = () => {
  return (
    <div>
      greeting app created by <a href="https://github.com/matnreyes">matnreyes</a>
    </div>
  )
}

const App = () => {
  const name = 'Peter'
  const age = 10

  return (
    <>
      <h1>Greetings</h1>
      <Hello name="Maya" age={26+10} />
      <Footer />
    </>
  )
}
export default App