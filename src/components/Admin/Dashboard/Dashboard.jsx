import axios from 'axios'
import React, { useState,useEffect } from 'react'
import moment from 'moment';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import styles from './Dashboard.css'



export default function Dashboard() {
  

 
  const [isAllowed, setIsAllowed] = useState(false)

  async function checkInOut(action, code) {

    try {
      let allowed = moment().hour() > moment().hour(18);
      if (action === "start_time" || action === "end_time" ) {
        let body = {
          "map_link": "https://www.google.com/maps/@30.0664773,31.2282846,12z?entry=ttu",
          "action_type": action,
        }
        if (code) {
          body = {
            ...body,
            "update_code": code
          }
        }
        let token = localStorage.getItem('token')
        let response = await axios.post(`http://127.0.0.1:8000/api/user/attendance/check-in-out`, { ...body }, {
          headers: { "Authorization": `Bearer ${token}` }
        }).catch((err) => {
          console.log(err);
          if (!err.response.data.success && action === "end_time" ) {
            setIsAllowed(true);
          }
          toast.error(err.response.data.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        })
        console.log(response);
        console.log(response.data.success);
        if (response.data.success) {
          setIsAllowed(false);
          toast.success('Success', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        }
      } else if (action === 'end_time' && allowed ) {
        setIsAllowed(true);
        toast.error('Contact Admin for verify code', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
      // console.log(moment().hour() > moment().hour(18)
      // );
     
        // if (response.) {
          
        // }
    } catch (error) {
      console.log(error);
    }

  }
  async function dashboard() {
    let response = await axios.get(`http://127.0.0.1:8000/api/dashboard/users`, {
      headers: { "Authorization": `Bearer 30|Earl4GuPuyI1wzl0epejelJhfPr18zXIR7mNcnKocb2413e5` }
    })
    console.log(response);
  }
  var [date, setDate] = useState(new Date());
  useEffect(() => {
    var timer = setInterval(() => setDate(new Date()), 1000)
    return function cleanup() {
      clearInterval(timer)
    }

  });
  return (
    <>
      <div className="container dashboard">
        <div className="row py-5">
          <h2>Dashboard</h2>
          <p className='mb-5'>Welcome to your dashboard</p>


          <div className='timer'>
            <h3> Check Timer before start Work</h3>
            <button className='btn btn-primary' onClick={() => checkInOut("start_time")} >Check in </button>
            <button className='btn btn-danger mb-5' onClick={() => checkInOut("end_time", document.getElementById('code')?.value)} >Check out </button>
            {isAllowed ? <div class="mb-3">
              <label htmlFor="code" class="form-label">verify code</label>
              <input type="text" class="form-control" id="code" name='code' placeholder="verify code" />
            </div> : ""} 
          </div>
          <div className='dt pt-5'>
            <p className="time">Time : {date.toLocaleTimeString()}</p>
            <p className="date">Date :{date.toLocaleDateString()}</p>
          </div>
        </div>
      </div>

      <ToastContainer />
    </>
  )
}
