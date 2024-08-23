import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Navbar from './Navbar';
import Footer from './Footer';
import axios from "axios"
import cookie from "js-cookie"
import image from "../Components/images/1724325358114.png"

function SpecificJob() {

    const [selectedOption, setSelectedOption] = useState("");
    const [data, setData] = useState([])
    const [id, setId] = useState("")

  
    // event
    const handleSelectChange = (event,item) => {
        console.log("HandelChange event", event.target.value);
        console.log("item",item);
        setId(item._id)
        setSelectedOption(event.target.value); // Update the state with the selected value
    };

    const location = useLocation()
    const { value } = location.state
    const whichJobId = value._id
    const NoOfPositions = value.noOfPosition
    console.log("id", whichJobId);

    useEffect(() => {
        async function usingAxios() {
            const userCookie = cookie.get("token")
            // const UserAction=selectedOption
            const userData = { whichJob: whichJobId, cookie: userCookie, option: selectedOption, _id: id }
            console.log("userdata", userData);

            const responce = await axios.post("http://localhost:8000/admin/specificJob", userData)
                .then((res) => {
                    const body = res.data.data
                    setData(body)
                })
        }
        usingAxios()
    }, [selectedOption])

      function handleClick(path){
       const data="file:///C:/Users/prati/.vscode/program/Node/job%20portal/backend/"+path
        console.log(data);
        window.open(image,"_blank")
      }
    return (
        <>
            <Navbar />
            <div>
                <p style={{ margin: "10px 250px", fontSize: "28px", fontWeight: "bold" }}>Applications ({data.length})</p>
                <div className="tables">
                    <table>
                        <tr >
                            <th className='tablehead'> Full Name</th>
                            <th className='tablehead'> Email</th>
                            <th className='tablehead'> Contact</th>
                            <th className='tablehead'> Position</th>
                            <th className='tablehead'> Action</th>
                        </tr>
                        {data ? data.map((item, index) => (

                            <>
                            {/* {console.log(item._id)} */}
                                <tr className='tablerow' key={index}>
                                    <td>{item.name}</td>
                                    <td>{item.email}</td>
                                    <td style={{cursor:"pointer"}} onClick={()=>handleClick(item.resume)}> resume </td>
                                    {/* <a href="file:///C:/Users/prati/.vscode/program/Node/job%20portal/backend/uploads\1724292660602.jpeg" target='_blank' rel='noopener noreferrer'> Resume</a> */}
                                    <td>{NoOfPositions}</td>
                                    <div className="cent" style={{ width: "360px" }}>
                                        <select onChange={()=>handleSelectChange(event,item)}>
                                            <option value="" disabled selected>Action</option>
                                            <option value="Accept"  >Accept</option>
                                            <option value="Reject" >Reject</option>
                                        </select>
                                    </div>
                                </tr>
                            </>
                        )) : ""}
                    </table>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default SpecificJob
