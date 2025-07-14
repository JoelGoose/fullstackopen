import { useState } from 'react'

const Header = (props) => {
  console.log(props)
  return(
    <h1>{props.text}</h1>
  )
}

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const StatisticLine = props => {
  console.log(props)
  // if props.text === positive then add a '%' symbol else add no symbol
  return (
    <tr>
      <td>{props.text}</td><td>{props.text === 'positive' ? `${props.value}%` : props.value}</td>
    </tr>
  )
}

const Statistics = ({ good, neutral, bad, all, average, positive }) => {
  if (all === 0) {
    return <div>No feedback given</div>
  }
  return (
    <table>
      <tbody>
        <StatisticLine text='good' value={good}/>
        <StatisticLine text='neutral' value={neutral}/>
        <StatisticLine text='bad' value={bad}/>
        <StatisticLine text='all' value={all}/>
        <StatisticLine text='average' value={average}/>
        <StatisticLine text='positive' value={positive}/>
      </tbody>
    </table>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  // calculating needed variables
  const all = good + neutral + bad
  const average = (good * 1 + neutral * 0 + bad * -1) / all
  const positive = good / all * 100

  console.log('rendering with good value', good)
  console.log('rendering with neutral value', neutral)
  console.log('rendering with bad value', bad)


  const handleGoodClick = () => {
    console.log('good button clicked')
    console.log('good value before:', {good})
    setGood(good + 1)
  }

  const handleNeutralClick = () => {
    console.log('neutral button clicked')
    console.log('neutral value before:', {neutral})
    setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
    console.log('bad button clicked')
    console.log('bad value before:', {bad})
    setBad(bad + 1)
  }

  return (
    <div>
      <Header text='give feedback' />
      <Button onClick={handleGoodClick} text='good'/>
      <Button onClick={handleNeutralClick} text='neutral'/>
      <Button onClick={handleBadClick} text='bad'/>
      <Header text='statistics'/>
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        all={all}
        average={average}
        positive={positive} />
    </div>
  )
}

export default App