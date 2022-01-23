import React from 'react'


const Part = ({content, exercises}) => {
    return(
      <div>
        <p>{content} {exercises}</p>
      </div>
    )
  }
  
  
  const Header = ({title}) => {
    return(
      <div>
        <h1>{title}</h1>
      </div>
    )
  }
  
  const Footer = ({total}) => {
    return(
      <div>
        <p>
          <b>Total of {total} exercises</b>
        </p>
      </div>
    )
  }
  
  const Content = ({parts}) => {
    const total = parts.reduce((sum, part) => sum+part.exercises, 0)
    return(
      <div>
        {parts.map(part => (<Part content={part.name} key={part.id} exercises={part.exercises}/>))}
        <Footer total={total}/>
      </div>
    )
  }
  
  const Course = ({course}) => {
    return (
      <div>
        <Header title={course.name} key={course.id}/>
        <Content parts={course.parts}/>
      </div>
    )
  }

  export default Course
