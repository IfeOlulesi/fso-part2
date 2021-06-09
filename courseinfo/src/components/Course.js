import React from "react";

const Header = ({ course }) => {
  return (    
      <h2 key={course.id}>{course.name}</h2>
  )
};

const Content = ({ course }) => {
  // console.log(`From content component: `, course)
  return (
    <div>
        <Part key={course.id} parts={course.parts}/>
    </div>
  )
};

const Part = ( {parts} ) => {
  // console.log(`From part component: `, parts)
  return (
    <ul>
      {parts.map((part) => (
        <li key={part.id}> {part.name} - {part.exercises} exercises </li>
      ))}
    </ul>
  )
};

const Total = ({parts}) => {
  // console.log('From total component: ', parts)
  return (
    <h4>
      Total of{" "}
      {parts.reduce((acc, cur) => {
          return acc + cur.exercises;
        }, 0)} {" exercises"}
    </h4>
  )
};

const Course = ( {courses} ) => {
  // console.log("From course component", courses)
  return (
    <React.Fragment>
      <h1>Web Development Curriculum</h1>
      {courses.map((course) => (
        <div key = {course.id}>
          <Header course = {course} />
          <Content course = {course} />
          <Total parts = {course.parts} />
        </div>
      ))}
    </React.Fragment>
  )
};

export default Course;
