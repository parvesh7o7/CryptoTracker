import { Routes, Route } from 'react-router'
import Home from './pages/Home'
import { useParams } from 'react-router'
import Navbar from './pages/Navbar'
import DarkVeil from '../AnimatedComps/DarkVeil'
import { searchQueryContext } from './pages/Navbar'
import { useState } from 'react'
import CoinDetail from './pages/CoinDetail'
function App() {
  const [searchValue, setSearchValue] = useState("");
  return (
    <>
      {/* Background Layer */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -1 }}>
        <DarkVeil
          hueShift={0}
          noiseIntensity={0}
          scanlineIntensity={0}
          speed={0.5}
          scanlineFrequency={0}
          warpAmount={0}
        />
      </div>

      {/* Main Content */}
      <searchQueryContext.Provider value={{ searchValue, setSearchValue }}>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/coins/:id' element={<CoinDetail />} />
        </Routes>
      </searchQueryContext.Provider>
    </>
  )
}

export default App
