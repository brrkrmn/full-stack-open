import { useState } from 'react'

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;
  const average = (good - bad)/total;
  const positivePercentage = good/total*100;
  return (
    <>
      <h1>Statistics</h1>
      <table>
        <tbody>
          <StatisticLine text="Good" value={good}/>
          <StatisticLine text="Neutral" value={neutral}/>
          <StatisticLine text="Bad" value={bad}/>
          <StatisticLine text="All" value={total}/>
          <StatisticLine text="Average" value={average}/>
          <StatisticLine text="Positive" value={positivePercentage}/>
        </tbody>
      </table>
    </>
  )
}

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <th>
        {text} :
      </th>
      <td>
        {value}
      </td>
    </tr>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  const handleClickGood = () => {
    setGood(good + 1)
  }
  const handleClickNeutral = () => {
    setNeutral(neutral + 1)
  }
  const handleClickBad = () => {
    setBad(bad + 1)
  }
  
  return (
    <div>
      <h1>Give Feedback</h1>
      <button onClick={handleClickGood}>Good</button>
      <button onClick={handleClickNeutral}>Neutral</button>
      <button onClick={handleClickBad}>Bad</button>
      {good > 0 || neutral > 0 || bad > 0
        ? (
          <Statistics good={good} neutral={neutral} bad={bad} />
        )
        : <p>No feedback given</p>
        }
    </div>
  )
}

export default App