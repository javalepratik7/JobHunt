import React, { useState } from 'react'
import axios from "axios"
import cookies from "js-cookie"
import { NavLink } from 'react-router-dom'
import { X } from 'lucide-react';

function Login(props) {
  const [role, setRole] = useState("")

  // passing data to paraent 
  const sendDataToNavbar = () => {
    // console.log("infoo is comming here");
    props.buttonIsLogin(false)
  }

  const onsubmit = async (event) => {
    // event.preventDefault()
    const useremail = document.getElementById("email").value
    const userpassword = document.getElementById("password").value

    if (useremail == "" || userpassword == "") {
      return alert("Please enter email and password")
    }


    const userData = {
      email: useremail,
      password: userpassword
    }
    // console.log(userData);
    // alert(userData)

    // try {
    //   alert("stop")
    //   const responce = await axios.post("http://localhost:8000/user/login", userData)
    //   alert("wait")
    //   console.log("Data from backend", responce.data);
    //   await cookies.set("token", responce.data.cookies)
    //   alert(res.data.message)
    //   console.log("cookie", res.data.cookies);
    //   setRole(res.data.Role)
    //   console.log("role", res.data.Role);

    // } catch (error) {

    //   console.log(err.data);
    //   alert("Calling mail", res.data.message)

    // }
     axios.post("http://localhost:8000/user/login", userData)
      .then(async(res) => {
        console.log("Data from backend",res.data);
        // alert("comming", res.data)
       await cookies.set("token", res.data.cookies)
        console.log("cookie", res.data.cookies);
        setRole(res.data.Role)
        console.log("role", res.data.Role);
        alert(res.data.message)
        // sendDataToNavbar()
      }).catch(err)
    {
      // console.log("catch calling");
      if (err.data) {
        console.log(err.data);
        alert("Calling mail", res.data.message)
      }
    }
    alert("hello")
    console.log(responce);

  }
  return (
    <>
      <div className='login' >
        <form action="" style={{ width: "40vw", borderRadius: "20px", border: "3px solid black", backgroundColor: "white" }}>
          <button className='exitButton' style={{ cursor: "pointer" }} onClick={sendDataToNavbar}><X /></button>
          <div className='loginMain'>
            <p style={{ padding: "3px 10px 10px 50px", fontWeight: "bold", fontSize: "30px", color: "rgb(229, 80, 105)" }}>Login</p>
            <label htmlFor="" style={{ padding: "0px  50px" }}>Email</label><br />
            <input required id='email' type="email" placeholder='Please enter your email' className='label' /><br />

            <label htmlFor="" style={{ padding: "0px  50px" }}>password</label><br />

            <input required id='password' type="password" placeholder='Please enter your password' className='label' style={{ marginBottom: "15px" }} />

            <div className='cent' style={{ width: "35vw", justifyContent: "space-between", margin: "20px" }}>
              <button className='BackButton' onClick={() => {
                // console.log("onclick happen");
                onsubmit()
              }} style={{ width: "90px", marginLeft: "50px", marginBottom: "30px", marginTop: "18px" }}> Submit  </button>

              <div style={{ marginTop: "18px" }}>
                <p> Not registered?
                  <NavLink to="/signup" style={{ marginLeft: "10px" }} >signup</NavLink>
                </p >
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}

export default Login


