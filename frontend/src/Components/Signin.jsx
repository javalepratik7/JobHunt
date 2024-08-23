import React, { useState } from 'react'
import axios from "axios"
import { NavLink } from 'react-router-dom'
// import { NavLink } from 'react-router-dom'

function Signin() {

    const [selectedoption, setSelectedOption] = useState()
    const [loginSuccessfully, setLogiSuccessfully] = useState(true)
    const [navlink, setNavlink] = useState(false)
    const handelChange = (event) => {
        setSelectedOption(event.target.value)
        alert(selectedoption)
    }

    const onSignin = async () => {
        console.log("signing");

        console.log(selectedoption);

        const username = document.getElementById("name").value
        const useremail = document.getElementById("email").value
        const userMobileNo = document.getElementById("MobileNo").value
        const userpassword = document.getElementById("password").value
        const profileImage = document.getElementById("files").files[0]

        if (useremail == "" || userpassword == "" || username == "" || userMobileNo == "") {
            return alert("Please Fill all data")
        }
        alert(" after selectedoption")

        // const userData = {
        //     name: username,
        //     email: useremail,
        //     password: userpassword,
        //     mobileNo: userMobileNo,
        //     Role:selectedoption,
        //     file:userFile
        // }

        const formData = new FormData();
        formData.append("name", username,);
        formData.append('email', useremail);
        formData.append('password', userpassword);
        formData.append('mobileNo', userMobileNo);
        console.log(selectedoption);
        formData.append('Role', selectedoption);
        formData.append('profileImage', profileImage);
        // alert(userData)
        console.log("formData", formData);


        const responce = await axios.post("http://localhost:8000/user/signin", formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then((res) => {
                console.log(res.data);
                alert(res.data.message)
                if (res.data.message == "Created successfully") {
                    // alert("coming here")
                    setLogiSuccessfully(!loginSuccessfully)
                }
            }).catch((err) => {
                alert(err)
            })
    }
    return (
        <>
            <div className='signUp'>
                <form style={{ width: "40vw", borderRadius: "25px", boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.5)", marginTop: "30px", height: "90vh" }}>
                    <NavLink to="/">
                        <button className='exitButton' >X</button>
                    </NavLink>
                    <div className='loginMain'>
                        <p style={{ padding: "3px 10px 10px 50px", fontWeight: "bold", fontSize: "30px", color: "rgb(229, 80, 105)" }}>SignUp</p>

                        <label htmlFor="" style={{ padding: "0px  50px" }}>Name</label><br />
                        <input required name='name' id='name' type="text" placeholder=' Name' className='label' /><br />

                        <label htmlFor="" style={{ padding: "0px  50px" }}>Email</label><br />
                        <input required name='email' id='email' type="email" placeholder=' email' className='label' /><br />

                        <label htmlFor="" style={{ padding: "0px  50px" }}>Mobile No</label><br />
                        <input required name='MobileNo' id='MobileNo' type='number' placeholder='Mobile No' className='label' /><br />

                        <label htmlFor="" style={{ padding: "0px  50px" }}>password</label><br />
                        <input required name='password' id='password' type="password" placeholder=' password' className='label' style={{ marginBottom: "15px" }} />

                        <div style={{ display: "flex" }}>
                            <h2 style={{ fontSize: "20px", paddingLeft: "45px", margin: "15px 10px" }}>Role</h2>
                            <div style={{ display: "flex", justifyContent: "space-evenly", alignItems: "center", width: "300px" }}>
                                <div>
                                    <input type="radio" id="Student" name="fav_language" value="Student" checked={true} onClick={handelChange} />
                                    <label htmlFor="Student">Student</label>
                                </div>
                                <div>
                                    <input type="radio" id="Recuriter" name="fav_language" value="admin" onClick={handelChange} />
                                    <label htmlFor="Recuriter">Recuriter</label>
                                </div>
                            </div>
                        </div>
                        <div style={{ display: "flex" }}>
                            <label htmlFor="" style={{ padding: "0px  50px",  fontWeight: "bold", fontSize: "18px" }}>Resume</label>
                            <input type="file" id='files' style={{ marginLeft: "50px", fontSize: "16px" }} />
                        </div>
                        <NavLink to={loginSuccessfully ? "/signup" : "/"}>
                            <button className='BackButton' style={{ width: "90px", marginLeft: "50px", marginBottom: "30px", marginTop: "18px" }} onClick={onSignin}>SignUp</button>
                        </NavLink>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Signin

