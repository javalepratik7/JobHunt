import React, { useEffect, useState } from 'react'
import user from '../Components/images/user.png'
import '../App.css'
import { NavLink } from 'react-router-dom'
import Login from './Login'
import { UserRound, } from 'lucide-react';
import cookie from "js-cookie"
import axios from 'axios'


function Navbar() {
    const [login, setLogin] = useState(false)
    const [role, setRole] = useState()

    useEffect(() => {
        function effect() {
            const userCookie = cookie.get("token")
            const userData = { cookie: userCookie }
            const responce = axios.post("http://localhost:8000/appliedjob/navbar", userData)
            .then((res)=>{
                console.log(res.data.role);
                setRole(res.data.role)
            })
        }
        effect()
    }, [])

    const handelDataFromChild = (data,) => {
        console.log(data);
        // console.log("info",info);
        // setRole(info)
        // alert(info)

        setLogin(data);
    }
    return (
        <>
            <div className='navBar' >
                <div>
                    <h1 id='title' style={{ color: "#263f5e" }}>Job<span style={{ color: "rgb(229, 80, 105)" }} >Hunt</span> </h1>
                </div>
                <div className='navBar'>
                    <NavLink className="navlink" to="/">Home</NavLink>
                    <NavLink className="navlink" to="/jobs">job</NavLink>
                    <NavLink className="navlink" to="/myappliedjob">Applied Jods</NavLink>
                    {console.log(role)}
                    {role=="admin"?<NavLink className="navlink" to="/adminjob">Admin Jods</NavLink>:""}
                    <NavLink className="navlink" onClick={() => { setLogin(!login) }} style={{ color: "#263f5e" }}>Login</NavLink>
                    <NavLink className="navlink" to="/profile">
                        <div>
                            <UserRound size={37} />
                        </div>
                    </NavLink>
                    {login ? <Login buttonIsLogin={handelDataFromChild} /> : ""}
                </div>
            </div>
        </>
    )
}

export default Navbar
