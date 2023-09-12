import React, {useState,useEffect} from "react";
import { Link } from "react-router-dom";
import styles from './Navbar.css'
import img2 from '../../Assets/Images/img2.jpg'

export default function Navbar(){

    const [isAdmin,setIsAdmin]=useState(false);

function checkRole(){
let role =    localStorage.getItem('role');

if (role === 'admin') {
    setIsAdmin(true);
}
}
useEffect(()=>{
    checkRole()
},[])

    return(
        <div className="main-sidebar">
         <div className="slidebar-top">
            <h4>Tadafuq Dashbord</h4>
            <img src={img2} />
         </div>
        <nav className="nav flex-column py-5 vh-100 sidebar">
            <Link to={'dashboard'} className="nav-link active mb-5" aria-current="page" >Dashboard</Link>
       {isAdmin?<Link className="nav-link"to={'users'}>Users</Link> :""   } 
       {isAdmin?<Link className="nav-link" href="#">Generate Code</Link> :""   } 
       <Link to={''} className="nav-link " >Reports</Link>    
        {/* <a className="nav-link" href="#">Link</a> */}
            {/*<a className="nav-link disabled" aria-disabled="true">Disabled</a>*/}
        </nav>
        </div>
    )
}