import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Manager from './components/Manager'
import Footer from './components/Footer'

function App() {

  return (
    <>
      <Navbar />
      <div className='bg-white bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(144,238,144,.5)_100%)]'>
        <Manager />
      </div>
      <Footer />
    </>
  )
}

export default App
