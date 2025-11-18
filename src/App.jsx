import { useState } from 'react'
import './App.css'
import Navbar from './componenets/Navbar'
import Manager from './componenets/Manager'
import Footer from './componenets/Footer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar />
      <div className='min-h-[88vh]' >
        <Manager />
      </div>
      <Footer />
    </>
  )
}

export default App
