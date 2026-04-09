import { Routes, Route } from 'react-router'
import Home from './pages/Home'
import { useParams } from 'react-router'
import Navbar from './pages/Navbar'
import DarkVeil from '../AnimatedComps/DarkVeil'

function App() {
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
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/coin/:id'></Route>
      </Routes>
    </>
  )
}

export default App
