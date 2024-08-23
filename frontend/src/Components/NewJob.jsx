import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import axios from "axios"
import cookie from "js-cookie"
import { NavLink } from 'react-router-dom'

function NewJob() {
    const submit = async () => {
        const userCookie = cookie.get("token")
        const usertitle = document.getElementById("Title").value
        const userDescription = document.getElementById("Description").value
        const userRequirement = document.getElementById("Requirement").value
        const userSalary = document.getElementById("Salary").value
        const userLocation = document.getElementById("Location").value
        const userJobTitle = document.getElementById("JobTitle").value
        const userExpresenceLevel = document.getElementById("ExpresenceLevel").value
        const userNoOfPosition = document.getElementById("NoOfPosition").value
        const userCompanyName = document.getElementById("CompanyName").value
        if (!usertitle || !userDescription || !userRequirement ||!userSalary ||!userLocation ||!userJobTitle ||!userExpresenceLevel ||!userNoOfPosition ||!userCompanyName) {
            return alert("please enter all information")
        }

        const userinfo = {
            title: usertitle,
            description: userDescription,
            requirements: userRequirement,
            salary: userSalary,
            location: userLocation,
            jobTitle: userJobTitle,
            experience: userExpresenceLevel,
            noOfPosition: userNoOfPosition,
            companyName: userCompanyName,
            email:userCookie
        }

        // console.log(userinfo);
        // console.log(userinfo.title);
        // alert(userinfo.title)

        const responce = await axios
            .post("http://localhost:8000/admin/jobs", userinfo)
            .then((res) => {
                if (res.data) {
                    alert(res.data.message)
                    console.log(res.data.message);
                }
            })
            .catch(err)
        {
            console.log("catch calling");
            if (err.data) {
                console.log(err.data);
                alert(res.data)
            }
        }
        // console.log("after axios calling");
        // alert("hello")
    }
    return (
        <>
            <Navbar />
            <div className='signUp'>
                <form style={{ width: "40vw", borderRadius: "25px", boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.5)" }} className='newJob'>

                    <div className='newBox'>
                        <label htmlFor="" id='label' style={{ padding: "0px  50px" }}>Title</label><br />
                        <input required name='Title' id='Title' type="text" placeholder=' Title' className='labelNewJob' /><br />
                    </div>

                    <div className='newBox'>
                        <label htmlFor="" id='label' style={{ padding: "0px  50px" }}>Description</label><br />
                        <input required name='Description' id='Description' type="text" placeholder='Description' className='labelNewJob' /><br />
                    </div>

                    <div className='newBox'>
                        <label htmlFor="" id='label' style={{ padding: "0px  50px" }}>Requirement</label><br />
                        <input required name='Requirement' id='Requirement' type="text" placeholder=' Requirement' className='labelNewJob' /><br />
                    </div>

                    <div className='newBox'>
                        <label htmlFor="" id='label' style={{ padding: "0px  50px" }}>Salary</label><br />
                        <input required name='Salary' id='Salary' type="text" placeholder='Salary' className='labelNewJob' /><br />
                    </div>

                    <div className='newBox'>
                        <label htmlFor="" id='label' style={{ padding: "0px  50px" }}>Location</label><br />
                        <input required name='Location' id='Location' type="text" placeholder=' Location' className='labelNewJob' /><br />
                    </div>

                    <div className='newBox'>
                        <label htmlFor="" id='label' style={{ padding: "0px  50px" }}>Job Title</label><br />
                        <input required name='Job Title' id='JobTitle' type="text" placeholder='Job Title' className='labelNewJob' /><br />
                    </div>

                    <div className='newBox'>
                        <label htmlFor="" id='label' style={{ padding: "0px  50px" }}>Expresence Level</label><br />
                        <input required name='Expresence Level' id='ExpresenceLevel' type="text" placeholder=' Expresence Level' className='labelNewJob' /><br />
                    </div>

                    <div className='newBox'>
                        <label htmlFor="" id='label' style={{ padding: "0px  50px" }}>No of Position</label><br />
                        <input required name='No of Position' id='NoOfPosition' type="text" placeholder='No of Position' className='labelNewJob' /><br />
                    </div>

                    <div className='newBox'>
                        <label htmlFor="" id='label' style={{ padding: "0px  50px" }}>Company Name</label><br />
                        <input required name='Company Name' id='CompanyName' type="text" placeholder=' Company Name' className='labelNewJob' /><br />
                    </div>

                    <div className='newBox'>
                        <button className='BackButton' style={{ width: "220px", marginLeft: "50px", marginBottom: "30px", marginTop: "18px" }} onClick={submit}><NavLink to="/adminjob" style={{textDecoration:"none",color:"black",fontSize:"16px"}}>Submit</NavLink></button>
                    </div>

                </form>
            </div>
            <Footer />
        </>
    )
}

export default NewJob
