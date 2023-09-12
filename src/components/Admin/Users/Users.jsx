import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";


export default function Users(){
const [users,setUsers]=useState(0);
const [updateCode,setUpdateCode]=useState();

async  function usersList(){
    try {
        
        let response = await axios.get(`http://127.0.0.1:8000/api/dashboard/users`,{
            headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` }
        }).catch((err) => {
            console.log(err);
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
          console.log(response.data.data);
          setUsers(response.data.data);
    } catch (error){
        console.log(error);
    }
}


async  function generateCode(id){
    try {
        
        let response = await axios.post(`http://127.0.0.1:8000/api/dashboard/users/generate-update-code/${id}`,{},{
            headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` }
        }).catch((err) => {
            console.log(err);
            // toast.error(err.response.data.message, {
            //   position: "top-right",
            //   autoClose: 5000,
            //   hideProgressBar: false,
            //   closeOnClick: true,
            //   pauseOnHover: true,
            //   draggable: true,
            //   progress: undefined,
            //   theme: "colored",
            // });
          })
          console.log(response.data.data.update_code);
          setUpdateCode(response.data.data.update_code);
          document.getElementById(`${id}Code`).innerHTML=response.data.data.update_code;
        //   setUsers(response.data.data);
    } catch (error){
        console.log(error);
    }
}

function handleClick(){
    document.getElementById('new').classList.replace('d-none','d-flex');
    document.getElementById('btn').classList.add('d-none');
  }
  function discard(){
    document.getElementById('new').classList.replace('d-flex','d-none');
    document.getElementById('btn').classList.remove('d-none');
  }





useEffect(()=>{
    usersList();
},[])


    return(
        <>
        <div className="container p-5">
        <div className="row text-center  border border-bottom-0 border-black">
                <div className="col-1 border-end">
                    Id
                </div>
                <div className="col border-end">
                    Name
                </div>
                <div className="col border-end ">
                    Email
                </div>
                <div className="col border-end">
                    Phone
                </div>
                <div className="col-2 border-end">
                    Role
                </div>
                <div className="col-2">
                    Verify code
                </div>
            </div>
          {users? users.map((item)=>            <div key={item.id} className="row text-center  border border-black">
                <div className="col-1 border-end">
                    {item.id}
                </div>
                <div className="col border-end">
                    {item.name}
                </div>
                <div className="col border-end ">
                    {item.email}
                </div>
                <div className="col border-end">
                    {item.phone}
                </div>
                <div className="col-2 border-end">
                    {item.guard}
                </div>
                <div id={`${item.id}Code`} className="col-2">
                    
                    <button className="btn btn-sm font-semibold text-white btn-success" onClick={()=> generateCode(item.id)}> Generate code</button>
                </div>
            </div>  ):"" }
            <div className="row py-5 " id='btn'>
       <div className="col d-flex justify-content-center align-items-center  ">
       <i className="fa-solid fa-plus  border border-2 border-dark bg-steel p-2 rounded-circle pointer" onClick={handleClick}></i>

       </div>
        </div>
 <div id="new" className="row text-center mt-5  d-none">
       

                <div className="col ">
                <input type                                                                                 = "text" className={`form-control form-control-sm mb-3 py-2 `}  id='name'  name='name' placeholder="Name"  />
                </div>
                <div className="col  ">
                <input type                                                                                 = "text" className={`form-control form-control-sm mb-3 py-2 `}  id='email'  name='email' placeholder="email" />
                </div>
                <div className="col ">
                <input type                                                                                 = "tel" className={`form-control form-control-sm mb-3 py-2 `}  id='phone'  name='phone' placeholder="phone" />

                </div>
                <div className="col">
                <input type                                                                                 = "password" className={`form-control form-control-sm mb-3 py-2 `} placeholder='Password' id='password' name='password' />
                </div>
                <div className="col ">
                <input type                                                                                 = "password" className={`form-control form-control-sm mb-3 py-2 `} placeholder='Confirm password' id='repassword' name='repassword' />
                </div>
                <div className="form-group col-1 ">
          <button className='border-0 text-white fw-semibold px-3  py-2 rounded rounded-1 mb-0 bg-success text-decoration-none' type="button" onClick={() => AddUser(document.getElementById(`name`).value,document.getElementById(`role`).value ,document.getElementById(`password`).value.toString() ) }>Save</button>
        </div>
        <div className="form-group col-1">
        <button className='border-0 text-white fw-semibold px-3  py-2 rounded rounded-1 mb-0 bg-danger text-decoration-none ' type="button" onClick={discard} >Discard</button>
        </div>
       
       
        </div>
        </div>
        </>
    )
}