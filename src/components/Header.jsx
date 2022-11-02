import React, { useState } from 'react'
import {Button}from 'react-bootstrap';
import AuthModal from '../components/AuthModal/modal';

const Header = () => {

  const [openModal,setModal] = useState(false);
  const [modalName,setModalName] = useState(false);

  const handleClose = ()=>{
    setModal(false);
  }

  const onClickAuthBtn = (name)=>{
    setModalName(name);
    setModal(true)
  }

  let user = JSON.parse(localStorage.getItem('user'));

  let token = localStorage.getItem('token');

  const onLogout = ()=>{
    localStorage.setItem('user',null)
    localStorage.setItem('token',null);

    window.location.href = '/'
  }

  return (
    <div className='header-container'>
        <h1 className="text-center text-danger mt-3 mb-4">Wall Street Trade</h1>
        {user ?  <div className="auth-container">
        <div className="my-btn" style={{width:300}} onClick={()=>onLogout()}>
          <span style={{color:'tomato',marginRight:10}}>{user.name}</span>
          Logout
        </div>
        
        </div> :   <div className="auth-container">
        <div className="my-btn" onClick={()=>onClickAuthBtn('Login')}>
          Login
        </div>
        <div className="my-btn" onClick={()=>onClickAuthBtn('Signup')}>
          Sign up
        </div>
        </div>}
        <AuthModal modalName={modalName} handleClose={handleClose} show={openModal} />
    </div>
  )
}  

export default Header