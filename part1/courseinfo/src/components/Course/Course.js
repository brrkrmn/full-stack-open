import React from 'react';
import Part from '../Part';
import Sum  from '../Sum';

function Course({ course }) {
  return (
    <div>
      <h1>{course.name}</h1>
      {course.parts.map(part => (<Part key={part.id} part={part} />))}
      <Sum parts={course.parts}/>
    </div>
  )
}

export default Course;
