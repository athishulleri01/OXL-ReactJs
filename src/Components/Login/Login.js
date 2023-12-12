import React, { useState,useContext,useRef,useEffect } from 'react';
import {FirebaseContext} from '../../store/Context';
import Logo from '../../olx-logo.png';
import './Login.css';
import {useHistory,Link} from 'react-router-dom'
import Swal from 'sweetalert2'

function Login() {
  const history = useHistory();
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const inputRef = useRef()

  const {firebase} = useContext(FirebaseContext)

  useEffect(()=>{
    inputRef.current.focus()
  },[])

  const handleSubmit=(e)=>{
    e.preventDefault();
    // validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email)) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Please enter a valid email address",
        showConfirmButton: false,
        timer: 1500
      });

      return;
    }

    if (!password || password.length < 6 || /\s/.test(password)) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Password must be at least 6 characters long and should not contain white spaces",
        showConfirmButton: false,
        timer: 2500
      });
  
      return;
    }



    firebase.auth().signInWithEmailAndPassword(email,password).then(res=>{
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Login Successfully",
        showConfirmButton: false,
        timer: 1500
      });
      
      history.push('/')
    }).catch(error=>{
       // Log the response
       Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Enter valid username and password",
        showConfirmButton: false,
        timer: 1500
      });
      
      console.log(error.message);
    })
  }
  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo} alt='logo'></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            name="email"
            ref={inputRef}
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            defaultValue="John"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            name="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            defaultValue="Doe"
          />
          <br />
          <br />
          <button>Login</button>
        </form>
        <Link to='signup' style={{
          textDecoration: 'none',
          color:'black'
        }}>Signup</Link>
      </div>
    </div>
  );
}

export default Login;
