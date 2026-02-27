import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import HRISHome from './templates/HomeTemplate'
import AddEmployee from './templates/AddEmployeeTemplate'
import PayrollPage from './templates/PayrollTemaplte'
import People from './templates/PeopleTemplate'
import Compensation from './templates/Compensetion'
import PayrollPageii from './templates/PayroleTemplate_ii'



function App() {
  const [count, setCount] = useState(0)

  return (
    // <PayrollPageii/>
    <Compensation/>
    // <PayrollPage/>
    // <HRISHome/>
    // <People/>
    // <AddEmployee/>
  )
}

export default App
