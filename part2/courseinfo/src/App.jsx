const Header = ({ name }) => {
  return (
    <>
      <h1>{name}</h1>
    </>
  );
}

const Content = ({ parts }) => {
  return (
    <>
      {parts.map(course =>
        <Part key={course.id} id={course.id} name={course.name} exercises={course.exercises} />
      )}
    </>
  );
}

const Part = ({ name, exercises }) => {
  return (
    <>
      <li>{name} {exercises}</li>
    </>
  );
}

const Course = ({ name, parts }) => {
  return (
    <>
      <Header name={name} />
      <Content parts={parts} />
      <Total parts={parts} />
    </>
  );
}

const Total = ({ parts }) => {
  const totalSum = parts.reduce((accumulator, currentValue) => accumulator + currentValue.exercises, 0)
  return (
    <>
      <h4>total of {totalSum} exercises</h4>
    </>
  )
}
const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <>
    {courses.map(course => 
      <Course id={course.parts.id} name={course.name} parts={course.parts}/>
    )}
    </>
  )
}

export default App;
