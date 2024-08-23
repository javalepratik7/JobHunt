import React, { useEffect, useState } from 'react'
import axios  from 'axios'
import cookie from "js-cookie"
import Navbar from './Navbar'
import Footer from './Footer'

function Profile() {
    const [user,setUser]=useState([])
    // const ii="div"
    useEffect(()=>{
        async function effect() {
            const userCookie = cookie.get("token")
            const userinfo={
                cookie:userCookie
            }
            const responce=await axios.post("http://localhost:8000/appliedjob/profile",userinfo)
            .then(async(res)=>{
                // alert(res.data.message)
                console.log(res.data.info)
                await setUser(res.data.info)
            })
        }
        effect()
    },[])

  return (
    <>
    <Navbar/>
    {console.log("user",user) }
    {user.map((item,index)=>(
         <div style={{margin:"20px 100px",fontSize:"20px",fontWeight:"bold"}}>
          <p style={{padding:"10px"}}>Name:{item.name ||""}</p>
          <p style={{padding:"10px"}}>Email:{item.email}</p>
          <p style={{padding:"10px"}}>MobileNo:{item.mobileNo}</p>
          <p style={{padding:"10px"}}>Role:{item.role}</p>
        </div> 
        
    ))}
    {/* <div>
      <p>name:{user[0].name ||""}</p>
      <p>email:{user[0].email}</p>
      <p>mobileNo:{user[0].mobileNo}</p>
      <ii>info</ii>
    </div> */}

    <Footer/>
    </>
  )
}

export default Profile
