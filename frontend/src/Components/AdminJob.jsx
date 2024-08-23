import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import axios from 'axios'
import cookie from "js-cookie"
import Login from './Login'


function AdminJob() {

  const [login, setLogin] = useState(false)
  const [speceficJob, setspeceficjob] = useState([])
  const [selectedOption, setSelectedOption] = useState("");

  // event
  const handleSelectChange = (event) => {
    console.log(event.target.value);
    setSelectedOption(event.target.value); // Update the state with the selected value
  };

  // taking data from child
  const handelDataFromChild = (data) => {
    console.log(data);
    setLogin(data)
  }
  useEffect(() => {
    async function callingBackend() {
      const userCookie = cookie.get("token")
      const userData = { cookie: userCookie }

      const responce = await axios.post("http://localhost:8000/admin/adminjob", userData)
        .then((res) => {
          // alert(res.data.message)
          if (res.data.message == "Please Login") {
            // alert(res.data.message)
            console.log("message", res.data.message);
            setLogin(true);
          }
          return res.data.data
        })
      setspeceficjob(responce)
      console.log("specefic job", responce);
    }
    callingBackend()
  }, [])

  return (
    <>
      {/* {console.log("inner", login)} */}
      {login ? <Login buttonIsLogin={handelDataFromChild} /> : ""}
      <Navbar />
      <div className='adminjob'>
        <h2>Jobs</h2>
        <NavLink to="/newjob"><button className='BackButton'>New Job</button></NavLink>
      </div>
      <div className="tables">
        <table>
          <tr >
            <th className='tablehead'> Company Name</th>
            <th className='tablehead'> Role</th>
            <th className='tablehead'> location</th>
            <th className='tablehead'> No of Position</th>
            <th className='tablehead'> Action</th>
          </tr>
          {speceficJob ? speceficJob.map((value, index) => (
            <>
              <tr className='tablerow' key={index} >
                <td>{value.companyName}</td>
                <td>{value.jobTitle}</td>
                <td>{value.location}</td>
                <td>{value.noOfPosition}</td>
                <div className="cent" style={{ width: "360px" }}>
                  <NavLink to="/specificJob"  state={{ value }} className="navLink">Applications</NavLink>
                  {/* <select  onChange={handleSelectChange} >
                  <option value="" disabled selected>Action</option>
                  <option value="Accept">Accept</option>
                  <option value="Reject">Reject</option>
                </select> */}
                </div>
              </tr>
            </>
          )) : ""}
        </table>
      </div>
      <Footer />
    </>
  )
}

export default AdminJob
