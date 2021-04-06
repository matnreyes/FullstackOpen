import React, { useState } from 'react'

const Buttons = ({text, rating}) => {
  return (
    <div>
      <button onClick={rating[0]}> {text[0]} </button>
      <button onClick={rating[1]}> {text[1]} </button>
      <button onClick={rating[2]}> {text[2]} </button>
    </div>
  )
}

// a proper place to define a component
const Statistic = ({text, value}) => {
  if (text === 'positive') {
    return (
      <tr>
        <th>{text}</th>
        <td>{value}%</td>
      </tr>
    )
  }
  return (
    <tr>
      <th>{text}</th>
      <td>{value}</td>
    </tr>
  )
}
const Statistics = ({statistic, value}) => {
  return (
    <div>
      <table>
        <tbody>
          <Statistic text={statistic[0]} value={value[0]} />
          <Statistic text={statistic[1]} value={value[1]} />
          <Statistic text={statistic[2]} value={value[2]} />
          <Statistic text={statistic[3]} value={value[3]} />
          <Statistic text='positive' value={(value[0] / value[3]) * 100}/>
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
  const [average, setAverage] = useState(0)

  const handlePositive = () => {
    setGood(good + 1)
    setTotal(total + 1)
    setAverage(average + 1)
  }

  const handleNeutral = () => {
    setNeutral(neutral + 1)
    setTotal(total + 1)
  }

  const handleBad = () => {
    setBad(bad + 1)
    setTotal(total + 1)
    setAverage(average - 1)
  }

  return total !== 0 ? (
    <div>
      <h1>give feedback</h1>
      <Buttons text={['good', 'neutral', 'bad']} rating={[handlePositive, handleNeutral, handleBad]}/>
      <h1>statistics</h1>
      <Statistics statistic={['good', 'neutral', 'bad', 'total', 'average']} value={[good, neutral, bad, total, average]}/>
    </div>
  ) : (
    <div>
      <h1>give feedback</h1>
      <Buttons text={['good', 'neutral', 'bad']} rating={[handlePositive, handleNeutral, handleBad]}/>
      <h1>statistics</h1>
      <p>No feedback given</p>
    </div>
  )
}

export default App