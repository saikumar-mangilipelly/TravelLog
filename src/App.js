import './App.css'
import { Route, Routes, Navigate } from 'react-router-dom'
import Privateroute from './components/privaterouting/Privateroute'
import Maps from './components/map/Maps'
import Home from './components/home/Home'
import Login from './components/login/Login'
import Signup from './components/signup/Signup'
import Myreviews from './components/myreviews/Myreviews'
import Navbar from './components/navbar/Navbar';
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/maps' element={<Maps />} />
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/myreviews' element={<Myreviews/>}/>
      </Routes>
    </>
  )
}

export default App
