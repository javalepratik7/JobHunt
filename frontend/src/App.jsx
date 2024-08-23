import { useState } from 'react'
import './App.css'
import {
  BrowserRouter,
  createBrowserRouter,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import Navbar from './Components/Navbar'
import Home from './Components/Home'
import Jobs from './Components/Jobs';
import Login from './Components/Login';
import Signup from './Components/Signin';
import Footer from './Components/Footer';
import AdminJob from './Components/AdminJob';
import NewJob from './Components/NewJob';
import SpecificJob from './Components/SpecificJob';
import JobInfo from './Components/JobInfo';
import MyAppliedJob from './Components/MyAppliedJob';
import Profile from './Components/Profile';

function App() {
                                                                                                                                                                                                                                                                                                                                    
  return (
    <>
      {/* <Navbar /> */}
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/jobs' element={<Jobs />} />
          <Route path='/myappliedjob' element={<MyAppliedJob />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/adminjob' element={<AdminJob/>} />
          <Route path='/newjob' element={<NewJob/>} />
          <Route path='/specificJob' element={<SpecificJob/>} />
          <Route path='/jobInfo' element={<JobInfo/>} />
          <Route path='/profile' element={<Profile/>} />
          <Route path='*' element={<div>Error found</div>} />
        </Routes>
      </BrowserRouter>
      {/* <Footer /> */}
    </>
  )
}

export default App
