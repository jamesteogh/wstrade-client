import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { toast } from "react-toastify";
export default function AuthModal({ show, handleClose, modalName }) {
    const [state, setState] = useState({
        email: '',
        password: '',
        name: '',
        error: '',
    });

    const onChangeHandler = (e) => {
        setState({ ...state, [e.target.id]: e.target.value });
    };

    const onSubmit = async () => {
        if (!state.email) {
        toast.error('Email is required');
        return
        }

        if (!state.password) {
        toast.error('Password is required');
        return
        }

        try{
            if (modalName === 'Login') {
                const obj = {
                    email: state.email.toLowerCase().trim(),
                    password: state.password.trim(),
                };
        
                const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/auth/login`, obj);
                    console.log(res.data);
                if (res.data.success) {
                    localStorage.setItem('user', JSON.stringify(res.data.data));
                    localStorage.setItem('token', JSON.stringify(res.data.token));
                    window.location.reload();
                    toast.success(`Login Successful!`)
                    return
                }
        
                if (res.data.error) {
                    toast.error("Unable to login. Please try again later.")
                    setState({ ...state, error: res.data.error });
                    
                }
        
                return console.log(obj);
                }
        
                const obj = {
                email: state.email.toLowerCase().trim(),
                password: state.password.trim(),
                name: state.name,
                };
        
                const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/auth/register`, obj);
        
                if (res.data.success) {
                localStorage.setItem('user', JSON.stringify(res.data.data));
                localStorage.setItem('token', JSON.stringify(res.data.token));
                window.location.reload();
                }

                if (res.data.error) {
                    setState({ ...state, error: res.data.error });
                }
        } catch (err) {
            console.log(err);
            setState({ ...state, error: err.response.data.error[0] });
        }

    };
    
    return (
        <Modal
        show={show}
        onHide={() => {
            handleClose();
            setState({
            email: '',
            password: '',
            name: '',
            });
        }}
        >
        <Modal.Header closeButton>
            <Modal.Title>{modalName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {modalName === 'Login' ? (
            <div>
                <Form.Group className='mb-3'>
                <Form.Label>Email address</Form.Label>
                <Form.Control
                    onChange={onChangeHandler}
                    id='email'
                    type='email'
                    placeholder='Enter email'
                    value={state.email}
                />
                </Form.Group>
                <Form.Group className='mb-3'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                    onChange={onChangeHandler}
                    id='password'
                    type='password'
                    placeholder='Enter password...'
                    value={state.password}
                />
                </Form.Group>
            </div>
            ) : (
            <div>
                <Form.Group className='mb-3'>
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                    onChange={onChangeHandler}
                    id='name'
                    type='text'
                    placeholder='Enter your name here...'
                    value={state.name}
                />
                </Form.Group>
                <Form.Group className='mb-3'>
                <Form.Label>Email address</Form.Label>
                <Form.Control
                    onChange={onChangeHandler}
                    id='email'
                    type='email'
                    value={state.email}
                    placeholder='Enter email'
                />
                </Form.Group>
                <Form.Group className='mb-3'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                    onChange={onChangeHandler}
                    id='password'
                    type='password'
                    placeholder='Enter password...'
                    value={state.password}
                />
                </Form.Group>
            </div>
            )}
            <div style={{ color: 'red', textAlign: 'center' }}>
            {' '}
            {state.error ? state.error : null}
            </div>
        </Modal.Body>
        <Modal.Footer>
            <Button variant='secondary' onClick={() => { handleClose(); setState({ email: '', password: '', name: '',});}}>
                Close
            </Button>
            <Button variant='primary' onClick={onSubmit}>
                {modalName}
            </Button>
        </Modal.Footer>
        </Modal>
    );
}


        // toast.success(`Login Successful!`) 