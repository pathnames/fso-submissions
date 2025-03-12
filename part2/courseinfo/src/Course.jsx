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

export default Course 
