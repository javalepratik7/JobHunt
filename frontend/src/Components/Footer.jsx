import React from 'react'
import facebook from "../Components/images/facebook-logo.png"
import insta from "../Components/images/instagram.png"
import tweeter from "../Components/images/tweeter-logo.png"
import {Facebook ,Twitter, Instagram } from 'lucide-react';


function Footer() {
  return (
    <>
      <div style={{ marginTop:"15px",display: "flex", justifyContent: "space-between", padding: "10px 100px", backgroundColor: "#212121", color: "white",paddingTop:"40px",paddingBottom:"40px"}}>
        <div style={{width:"25vw"}}>
            <h1>JobHunt</h1>
            <h2 className='footer2'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos consectetur numquam ipsa provident. Vitae, earum? Suscipit commodi, ex necessitatibus corrupti labore adipisci itaque aut magni voluptates unde dignissimos enim consequuntur?</h2>
        </div>
        <div>
          <h1>Home</h1>
          <h2 className='footer2'>Discover</h2>
          <h2 className='footer2'>Explore</h2>
          <h2 className='footer2'>jon</h2>
        </div>
        <div>
          <h1>Company</h1>
          <h2 className='footer2'>Corporation</h2>
          <h2 className='footer2'>Fashions</h2>
          <h2 className='footer2'>About Us</h2>
        </div>
        <div>
          <h1>Features</h1>
          <h2 className='footer2'>Shop</h2>
          <h2 className='footer2'>Cart</h2>
          <h2 className='footer2'>Sale</h2>
        </div>
        <div>
          <h1>Contact Us</h1>
          <h2 className='footer2'>Privacy & Policy</h2>
          <h2 className='footer2'>Terms Of Services</h2>
          <h2 className='footer2'>+91 1234567890</h2>
        </div>
      </div>
      <div style={{display:"flex",justifyContent:"center",backgroundColor:"#212121",paddingBottom:"25px"}}>
        <Instagram color="white" size={40}    style={{margin:"0px 20px"}}/>
        <Facebook  color="white" size={40}   style={{margin:"0px 20px"}}/>
        <Twitter color="white" size={40}   style={{margin:"0px 20px"}}/>
      </div>
    </>
  )
}

export default Footer
