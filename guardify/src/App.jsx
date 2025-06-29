import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import Home from './Pages/Home'
import Scan from './Pages/Scan'
import About from './Pages/About'

const App = () => {
  return (
    <div className='bg-[#141414] h-full w-full'>
      <Router>
        <Navbar />
        <div className='bg-[#141414]'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/Scan' element={<Scan />} />
            <Route path='/About' element={<About />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  )
}

export default App
