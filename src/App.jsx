import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import HRISHome from './HomeTemplate'
import People from './PeopleTemplate'
import AddEmployee from './AddEmployeeTemplate'

function App() {
  const [count, setCount] = useState(0)

  return (
    // <HRISHome/>
    // <People/>
    <AddEmployee/>
  )
}

export default App
