import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  return (
    <div>
      <h1>{props.course}</h1>
    </div> 
  )
}

const Content = (props) => {
  return (
    <div>
      <Part title={props.parts[0].name} quantity={props.parts[0].exercises}/>
      <Part title={props.parts[1].name} quantity={props.parts[1].exercises}/>
      <Part title={props.parts[2].name} quantity={props.parts[2].exercises}/>
    </div>
  )
}

const Part = (props) => {
  return (
    <div>
      <p>{props.title} {props.quantity}</p>
    </div>
  )
}

const Footer = (props) => {
  let suma = 0
  props.parts.forEach(value => {
    suma += value.exercises
  })
  return(
    <div>
      <p>Number of exercises: {suma}</p>
    </div>
  )
}

const App = () => {
  const objcourse = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  return (    
    <div>
      <Header course ={objcourse.name}/>
      <Content parts={objcourse.parts}/>
      <Footer parts={objcourse.parts}/>
    </div>
  )
}
ReactDOM.render(<App />, document.getElementById('root'))