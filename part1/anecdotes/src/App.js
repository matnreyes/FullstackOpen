import React, { useState } from 'react'

const Anecdote = ({anecdote, votes}) => (
  <div>
    {anecdote}
    <br/>
    has {votes} votes
  </div>
)

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>{text}</button>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]
  
  // Select random number
  const max = anecdotes.length - 1
  const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  const [selected, setSelected] = useState(getRandomNumber(0, max))
  const selectRandom = () => (setSelected(getRandomNumber(0, max)))

  // Handle votes
  const startVotes = new Array(anecdotes.length).fill(0)
  const [votes, updateVotes] = useState(startVotes)
  const handleVotes = () => {
    const copy = [...votes]
    copy[selected] += 1
    updateVotes(copy)
  }

  // Find most popular
  const findPopular = (votes) => {
    const largest = Math.max.apply(Math, votes)
    for (var index = 0; votes[index] !== largest; index++) {
    }
    return index
  }

  const mostPopular = {
    anecdote: anecdotes[findPopular(votes)],
    votes: votes[findPopular(votes)]
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Anecdote anecdote={anecdotes[selected]} votes={votes[selected]}/>
      <Button handleClick={handleVotes} text='vote'/>
      <Button handleClick={selectRandom} text='next anecdote'/>
      <h1>Anecdote with the most votes</h1>
      <Anecdote anecdote={mostPopular.anecdote} votes={mostPopular.votes}/>
    </div>
  )
}

export default App