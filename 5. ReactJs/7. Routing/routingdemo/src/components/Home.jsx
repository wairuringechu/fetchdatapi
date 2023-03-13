import React from 'react';
import Navbar from './Navbar';
import './Home.css'

function Home() {
  return (
    <div>
      <div className='navcontainer'>
        <h1>HERE IS MY NAVBAR</h1>
        <Navbar />
      </div>
      <div className='container'>
        <h1>MY HOME</h1>
        <p>WELCOME TO MY HOME PAGE</p>
      </div>
    </div>
  )
}
export default Home