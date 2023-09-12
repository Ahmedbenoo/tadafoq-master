import React from 'react'
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import styles from './Home.css'
export default function Home() {
  
  return (
    <>
    <div className="container-fluid main-home">
      <div className="row ps-0 ms-0">
        <div className="col-md-2 border-start-0 shadow ">
    <Navbar/>
        </div>
        <div className="col-md-10">
        <Outlet/>

        </div>
      </div>
    </div>

    </>
  )
}
