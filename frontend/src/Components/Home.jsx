import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import axios from "axios"
import { useEffect } from 'react'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import Girl from "./images/girl.png"
import { Search, CloudUpload, UserRound, CircleCheckBig, MapPin } from 'lucide-react';


function Home() {

  function color(index) {
    switch (index % 6) {
      case 0:
        return '#fab728';
      case 1:
        return '#8c3df0';
      case 2:
        return '#ffd600';
      case 3:
        return '#5dabf5';
      case 4:
        return '#ff93cd';
      case 5:
        return '#fae9b5';
      default:
        return 'white';
    }
  }

  const [jodsData, setJobsData] = useState([])
  useEffect(() => {
    async function Jobs() {
      try {
        const result = await axios.get("http://localhost:8000")
        // console.log("info", result.data.data.companyName);
        // console.log("All info", result);
        setJobsData(result.data.data)
      } catch (error) {
        console.log(error);
      }
    }
    Jobs()
  }, [])

  // console.log(jodsData);
  const filterJobs = jodsData.slice(-6)
  console.log("filterdata", filterJobs);


  return (
    <>
      <Navbar />
      <div className='homeMain'>
        <div className='per'>
          <h1 className='heading1'> The home of your dream job</h1>
          <h2 className='heading2'>Many immersive and interaction experience than traditional console or PC gaming</h2>
          <h2 style={{ margin: "20px 50px", fontSize: "40px", fontWeight: "bold", textAlign: "center", color: "#263f5e" }}>300K+ Active User</h2>
          <h3 className='heading2'>We have over 300k+ Satisfied and happy users around the world</h3>
        </div>
        <div className='per'>
          <img src={Girl} alt="" srcset="" className='girlImage' />
        </div>
      </div>
      <div style={{ marginTop: "50px" }}>
        {/* <h3 style={{textAlign:"center",fontSize:"25px",color:"#898585",margin:"20px"}}>How to Apply?</h3> */}
        <h1 style={{ textAlign: "center", fontSize: "50px", fontWeight: "bold", color: "#263f5e" }}>Follow Easy 4 Steps</h1>
        <h3 style={{ textAlign: "center", fontSize: "19px", color: "#7e7c7d", margin: "30px 200px", padding: "0px 90px" }}> There are variation of passages of ipsum available but the majority have suffered alteration there are many</h3>
        <div style={{ display: "flex", justifyContent: "space-evenly", margin: "60px 100px 0px 100px" }}>
          <div className="box box1">
            <div className='innerBox'>
              <Search size={60} strokeWidth={2.5} style={{ marginTop: "35px", color: "rgb(0, 250, 63)" }} />
              <h1>Search Job</h1>
              <h2>First you have to search job here</h2>
            </div>

          </div>

          <div className="box box3">
            <div className='innerBox'>
              <UserRound size={60} strokeWidth={2.5} style={{ marginTop: "35px", color: "rgb(136, 136, 245)" }} />
              <h1>Create Account </h1>
              <h2>First you have to create account here</h2>
            </div>
          </div>

          <div className="box box2">
            <div className='innerBox'>
              <CloudUpload size={60} strokeWidth={2.5} style={{ marginTop: "35px", color: "blue" }} />
              <h1>Cv/Resume </h1>
              <h2>First you have to cv/resume upload here</h2>
            </div>

          </div>

         
          <div className="box box4">
            <div className='innerBox'>
              <CircleCheckBig size={60} strokeWidth={2.5} style={{ marginTop: "35px", color: "rgb(94, 240, 94)" }} />
              <h1>Apply Them </h1>
              <h2>Then you have to apply here</h2>
            </div>

          </div>
        </div>
      </div>
      <div className='home'>

        <div className='top'>Browse Job Categories</div>
        <h1 className='toph'>There are many variation of passages of lorem ispsum available but the majority have suffered alteration there are many</h1>
      </div>



      {/* all cards using map */}
      <div style={{display:"flex" ,justifyContent:"center"}}>

        <div style={{ display: "grid", gridTemplateColumns: "auto auto auto", justifyContent: "space-evenly", margin: "25px 5px", width: "90vw" }}>
          {filterJobs.map((item, index) => (
            <div key={index}>
              <NavLink to="/jobInfo" style={{ textDecoration: "none", color: "black" }} state={{ item }}>
                <div className="card" style={{ borderBottomColor: color(index) }} >

                  <div>
                    <p style={{ fontSize: "25px", fontWeight: "bold", color: "#263f5e" }}>{item.companyName}</p>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div style={{ display: "flex", alignItems: "center", marginTop: "10px", color: "#7e7c7d" }}>
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

export default Home
