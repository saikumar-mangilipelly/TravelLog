import React from 'react'
import {useNavigate} from 'react-router-dom'
import './Home.css'
function Home() {
  const navigate=useNavigate()
  function navigatesignup(){
    navigate('/login')
  }
  return (
    <div className='homeimg'>
      <div className="container">
      <h1 className='mainsen'>Let's together Give Reviews to the places</h1>
      <p className='nextsen'>Let your review will helpful to someone</p>
      <p className='thirdsen'>Double tap to give your review..</p>
      <button className='btn btn-outline-light homebtn mb-5' type='button' onClick={navigatesignup}>Get Started</button>
      </div>
    </div>
  )
}

export default Home