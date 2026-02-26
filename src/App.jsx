import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import HRISHome from './templates/HomeTemplate'
import AddEmployee from './templates/AddEmployeeTemplate'
import PayrollPage from './templates/PayrollTemaplte'
import People from './templates/PeopleTemplate'



function App() {
  const [count, setCount] = useState(0)

  return (
    <PayrollPage/>
    // <HRISHome/>
    // <People/>
    // <AddEmployee/>
  )
}

export default App
