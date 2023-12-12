import React, { useContext, useState,useEffect,useRef } from "react";

import Logo from "../../olx-logo.png";
import "./Signup.css";
import { FirebaseContext } from "../../store/Context";
import { useHistory,Link } from "react-router-dom";
import Swal from 'sweetalert2';

export default function Signup() {
  const history = useHistory();
  const inputRef=useRef()
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const { firebase } = useContext(FirebaseContext);


  useEffect(()=>{
    inputRef.current.focus()
  },[])

  const handleSubmit = (e) => {
    e.preventDefault();

    // validation
    if (!username.trim()) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Please enter a valid username",
        showConfirmButton: false,
        timer: 1500
      });

      return;
    }

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
    const phoneRegex = /^[0-9]+$/;

    if (!phoneRegex.test(phone) || phone.includes(' ')) {

      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Enter valid phone number",
        showConfirmButton: false,
        timer: 1500
      });
      return ;
    }

    if (!password || password.length < 6 || /\s/.test(password)) {
      if(phone.length !== 10){
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Phone number must contain 10 digits",
          showConfirmButton: false,
          timer: 2500
        });
    
        return;
      }
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Password must be at least 6 characters long and should not contain white spaces",
        showConfirmButton: false,
        timer: 2500
      });
  
      return;
    }

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        // Update user profile
        return user.updateProfile({ displayName: username }).then(() => {
          // Add user data to Firestore
          return firebase.firestore().collection("users").add({
            id: user.uid,
            username: username,
            phone: phone,
          });
        });
      })
      .then(() => {
        console.log("User registration successful");
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "User registration successful",
          showConfirmButton: false,
          timer: 1500
        });
        history.push("/login");
      })
      .catch((error) => {
        console.error("Error during user registration:", error);
        // checking email already existing or not
        if (error.code === 'auth/email-already-in-use') {
         
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'The email address is already in use by another account.',
            showConfirmButton: false,
            timer: 1500,
          });
        } 
    
      });
  };

  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            ref={inputRef}
            name="name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            defaultValue="John"
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            defaultValue="John"
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            id="lname"
            name="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            defaultValue="Doe"
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
            onChange={(e) => setPassword(e.target.value)}
            defaultValue="Doe"
          />
          <br />
          <br />
          <button>Signup</button>
        </form>
        <Link to="login" style={{
          textDecoration: 'none',
          color:'black'
        }}>Login</Link>
      </div>
    </div>
  );
}
