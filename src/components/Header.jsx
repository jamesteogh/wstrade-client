import React, { useState } from 'react'
import { toast } from "react-toastify";
import Button from 'react-bootstrap/Button';
import AuthModal from './AuthModal/modal';
import { useNavigate } from 'react-router-dom';

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

  const onLogout = ()=>{
    toast.success(`Logout Successful!`)
    localStorage.setItem('user',null)
    localStorage.setItem('token',null);

    window.location.href = '/'
  }

  const navigate = useNavigate();

  return (
    <div className='header-container'>
      <div style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
        {window.location.pathname!=='/' ? <Button onClick={() => navigate('/')} style={{ width: 120,height:40,marginRight:10 }}>
          Watchlist
        </Button>:null}
          <h1 className="text-center mt-3 mb-4">Wall Street Trade <i className="fa-solid fa-arrow-trend-up"></i></h1>
      </div>

      {user ? ( 
        <div className="auth-container">
          <div className="my-btn" style={{width:300}} onClick={()=>onLogout()}>
            <span style={{color:'black',marginRight:10}}>{user.name}</span>
            Logout
          </div>
        </div> 
      ):( 
        <div className="auth-container">
          <div className="my-btn" onClick={()=>onClickAuthBtn('Login')}>
            Login
          </div>
          <div className="my-btn" onClick={()=>onClickAuthBtn('Sign up')}>
            Sign up
          </div>
        </div>)}
        <AuthModal modalName={modalName} handleClose={handleClose} show={openModal} />
    </div>
  )
}  

export default Header