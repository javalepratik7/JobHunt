import React, { useEffect, useState } from 'react'
import cookie from "js-cookie"
import axios from 'axios'
import Navbar from "./Navbar"
import { useNavigate, NavLink } from 'react-router-dom'
import Footer from './Footer'
import { MapPin } from 'lucide-react';

function MyAppliedJob() {
  const navigate = useNavigate();

  const [filterJobs, setfilterJobs] = useState([])
  useEffect(() => {
    function name() {
      const userCookie = cookie.get("token")
      const userData = { cookie: userCookie }
      const responce = axios.post("http://localhost:8000/appliedjob/myjobs", userData)
        .then(async (res) => {
          const body = await res.data.data || res.data.user.message
          if (res.data.message == "Please Login") {
            alert(res.data.message)
            navigate("/");
          }
          console.log("info", body);

          const data = await body.filter(job => job.whichJob !== null && job.whichJob !== undefined)
          const reverseData = data.reverse()
          setfilterJobs(reverseData)
        })
      console.log("responce", responce);

    }
    name()
  }, [navigate])
  return (
    <>
      <Navbar />

      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ display: "grid",width:"93vw", gridTemplateColumns: "auto auto auto", justifyContent: "space-evenly", margin: "25px 5px"}}>
          {console.log("filterjob   ", filterJobs)}
          {filterJobs.map((item, index) => (
            <div key={index}>
              {item.whichJob == undefined || null ? console.log("not value", item, index) : <NavLink to="/jobInfo" style={{ textDecoration: "none", color: "black" }} state={{ item }}>
                <div className="card"  >
                  <div>
                    <p style={{ fontSize: "25px", fontWeight: "bold", color: "#263f5e" }}>{item.whichJob.companyName}</p>
                    <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px", alignItems: "center" }}>
                      <div style={{ display: "flex", alignItems: "center", color: "#7e7c7d" }}>
                        <MapPin size={20} />
                        <p>{item.whichJob.location}</p>
                      </div>
                      <h2 style={{ color: "#7e7c7d", fontSize: "18px" }}>{item.whichJob.salary}</h2>
                    </div>
                  </div>

                  <p style={{ fontSize: "20px", fontWeight: "bold", padding: "10px 0px", textAlign: "center", color: "#263f5e" }}>{item.whichJob.jobTitle}</p>
                  <div style={{ display: "flex", justifyContent: "space-around", marginBottom: "15px" }}>
                    <p style={{ marginTop: "10px", color: "#7e7c7d" }}>{item.whichJob.noOfPosition} Positions</p>
                    <p style={{ marginTop: "10px", color: "#7e7c7d" }}>{item.whichJob.experience}</p>
                  </div>
                  <p style={{ textAlign: "center", color: "#7e7c7d" }}>{item.whichJob.description}</p>

                </div>
              </NavLink>}
              {/* {console.log("item data", item.whichJob)} */}
            </div>
          ))}
        </div>

      </div>
      <Footer />
    </>
  )
}

export default MyAppliedJob
