import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import cookie from "js-cookie"
import axios from 'axios'

function JobInfo() {
    const [count, setCount] = useState(0)
    const location = useLocation()
    const { item } = location.state
    console.log("position", item);

    const navigate = useNavigate();


    function handeldata() {
        const userCookie = cookie.get("token")
        const userData = {
            cookie: userCookie,
            userItem: item._id || item.whichJob._id
        }
        console.log("user data", userData);

        const responce = axios.post("http://localhost:8000/appliedjob", userData)
            .then((res) => {
                console.log("responce ",res.data);
                
                const body = res.data
                alert(res.data.message)
                if (res.data.message== 'Please Login') {
                    navigate("/")
                }
                console.log(body);

            }).catch((err) => {
                console.log(err);
            })
    }

    return (
        <>
            <Navbar />
            <div>
                <p style={{ fontSize: "35px", textAlign: "center", fontWeight: "bold", marginTop: "15px" }}>{item.companyName || item.whichJob.companyName}</p>
                <p style={{ fontSize: "25px", fontWeight: "bold", marginTop: "15px", paddingLeft: "220px" }}> Description : {item.description || item.whichJob.description}</p>
                <div style={{ display: "grid", gridTemplateColumns: "auto auto", justifyContent: "space-around", fontSize: "25px", fontWeight: "bold" }}>
                    <p style={{ margin: "10px" }}>job Title: {item.jobTitle || item.whichJob.jobTitle}</p>
                    <p style={{ margin: "10px" }}>Experience: {item.experience || item.whichJob.experience}</p>
                    <p style={{ margin: "10px" }}>location: {item.location || item.whichJob.location}</p>
                    <p style={{ margin: "10px" }}>No Of Position: {item.noOfPosition || item.whichJob.noOfPosition}</p>
                    <p style={{ margin: "10px" }}>Requirements: {item.requirements || item.whichJob.requirements}</p>
                    <p style={{ margin: "10px" }}>Salary: {item.salary || item.whichJob.salary}</p>
                    {item.action? <p style={{ margin: "10px" }}>Responce: { item.action||"panding"}</p>:""}
                   
                </div>
                <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" ,marginBottom:"40px"}}>
                    <button className='BackButton' onClick={handeldata} >Apply Now</button>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default JobInfo
