import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Head = ({title}) => ( 
  <div> <h1> {title} </h1> </div> 
  )

const Button = (props) => (
  <button onClick={props.handleClick}> {props.text} </button>
)

const Stat = ({name, value}) => (
    <tr><td>{name} {value}</td></tr>
)

const Stats = (props) => {
  if (props.allClicks.length === 0) {
    return(
      <div>
        <h1>No statistics yet</h1>
      </div>
    )
  } 
  return(
  <div>
    <Head title='statistics'/>
    <table>
      <tbody>
        <Stat name='good' value={props.good}/>
        <Stat name='neutral' value={props.neutral}/>
        <Stat name='bad' value={props.bad}/>
        <Stat name='all' value={props.allClicks.length}/>
        <Stat name='average' value={eval(props.allClicks.join('+'))/props.allClicks.length}/>
        <Stat name='positive' value={(props.good*100)/props.allClicks.length+' %'}/>     
      </tbody>
    </table>
  </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [allClicks, setAll] = useState([])
  const HandleGoodClick = () => {
    setAll(allClicks.concat(1))
    setGood(good + 1)
  }
  const HandleNeutralClick = () => {
    setNeutral(neutral + 1)
    setAll(allClicks.concat(0))
  }
  const HandleBadClick = () => {
    setBad(bad + 1)
    setAll(allClicks.concat(-1))
  }
  return (
    <div>
      <Head title='give feedback'/>
      <Button text='good' handleClick ={HandleGoodClick}></Button>
      <Button text='neutral' handleClick ={HandleNeutralClick}></Button>
      <Button text='bad' handleClick ={HandleBadClick}></Button>
      <Stats good={good} neutral={neutral} bad={bad} allClicks={allClicks}/> 
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)