const Course = ({course}) => {
  console.log(course);
  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

const Header = ({name}) => {
  console.log('Hello form Header!', name)
  return (
    <h1>{name}</h1>
  )
}

const Content = ({parts}) => {
  console.log('Hello from Content!', parts);
  return (
    <div>
      {parts.map(part => (
        <Part key={part.id} part={part} />
      ))}
    </div>
  )
}

const Part = ({part}) => {
  console.log('Hello from Part!', part)
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  )
}

const Total = ({parts}) => {
  console.log('Hello form Total!', parts)
  const total = parts.reduce((sum, part) => sum + part.exercises, 0)
  return (
    <strong>
      total of {total} exercises
    </strong>
  )
}

export default Course