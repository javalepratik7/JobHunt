import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import axios from "axios"
import { NavLink } from 'react-router-dom'
import {  MapPin } from 'lucide-react';

function Jobs() {

  const [jodsData, setJobsData] = useState([])
  useEffect(() => {
    async function Jobs() {
      try {
        const result = await axios.get("http://localhost:8000")
        // console.log("info", result.data.data.companyName);
        console.log("All info", result.data);
        const data=result.data.data
        const reverseData=data.reverse()
        setJobsData(reverseData)
        // setJobsData(result.data.data)
      } catch (error) {
        console.log(error);
      }
    }
    Jobs()
  }, [])
  return (
    <>
      <Navbar />
      <div style={{display:"flex",justifyContent:"center"}}>
        <div style={{ display: "grid", gridTemplateColumns: "auto auto auto", justifyContent: "space-evenly", margin: "25px 5px",width:"93vw" }}>
          {jodsData.map((item, index) => (
            <div key={index}>
              <NavLink to="/jobInfo" style={{ textDecoration: "none", color: "black" }} state={{ item }}>
              <div className="card"  >
                <div>
                  <p style={{ fontSize: "25px", fontWeight: "bold", color: "#263f5e" }}>{item.companyName}</p>
                  <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px", alignItems: "center" }}>
                    <div style={{ display: "flex", alignItems: "center", color: "#7e7c7d" }}>
                      <MapPin size={20} />
                      <p>{item.location}</p>
                    </div>
                    <h2 style={{ color: "#7e7c7d", fontSize: "18px" }}>{item.salary}</h2>
                  </div>
                </div>

                <p style={{ fontSize: "20px", fontWeight: "bold", padding: "10px 0px", textAlign: "center", color: "#263f5e" }}>{item.jobTitle}</p>
                <div style={{ display: "flex", justifyContent: "space-around", marginBottom: "15px" }}>
                  <p style={{ marginTop: "10px", color: "#7e7c7d" }}>{item.noOfPosition} Positions</p>
                  <p style={{ marginTop: "10px", color: "#7e7c7d" }}>{item.experience}</p>
                </div>
                <p style={{ textAlign: "center", color: "#7e7c7d" }}>{item.description}</p>
               
              </div>
            </NavLink>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Jobs
