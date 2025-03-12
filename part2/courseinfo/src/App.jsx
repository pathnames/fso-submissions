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
    </>
  );
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
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
      }
    ]
  };

  return <Course name={course.name} parts={course.parts} />;
}

export default App;
