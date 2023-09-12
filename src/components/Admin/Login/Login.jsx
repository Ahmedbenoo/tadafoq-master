import React, { useState } from 'react'
import { useFormik } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import styles from './Login.css'

export default function Login() {
    let navigate = useNavigate();
    const [role, setRole] = useState('user');


    let formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            "phone": "",
            "password": ""
        },
        onSubmit: values => {
            // console.log(values);
            login(values);

            // navigate("/dashboard")
        }
    })

    async function login(values) {
        try {
            let response = await axios.post(`http://127.0.0.1:8000/api/${role}/login`, {
                ...values
            }, {
                "Content-Type": "application/json"
            }).catch((err) => {
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

                console.log(err.response.data.message)
            }
            )


            console.log(response.data);
            // console.log(response.status);
            if (response.data.success === true) {
                localStorage.setItem('token', response.data.data.access_token);
                localStorage.setItem('role', response.data.data.guard);


                navigate("/home");
                formik.setValues({
                    "phone": "",
                    "password": ""
                })
                // console.log("success");
            }
        } catch (err) {
            console.log(err.response)
        }

    }
    function adminLogin() {
        setRole('admin');
        formik.submitForm()
    }


    return (
        <>
            <div className='login'>
                <div className='cover'></div>

                <div className='login-content'>
                    <h3 className='h3'>Tadafuq Login</h3>

                    <div className="row py-5 ">
                        <form onSubmit={formik.handleSubmit}>

                            <div className="inputGroup">
                                <label htmlFor="phone" className="form-label">Phone</label>
                                <input type="tel" className={styles.input} id="phone" name='phone' placeholder="Enter your phone" value={formik.values.phone} onBlur={formik.handleBlur} onChange={formik.handleChange} />
                            </div>
                            <div>
                                <div className="inputGroup2">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input type='password' className={styles.input} placeholder="Enter your Password" id="password" name='password' value={formik.values.password} onBlur={formik.handleBlur} onChange={formik.handleChange}></input>
                                </div>

                            </div>
                            <div className="row d-flex justify-content-between align-items-center loginButtons">
                                <div className="col-6 p-0">
                                    <button className='btn p-2 text-white bg-success' type='submit' onClick={() => setRole('user')}>Login as User</button>
                                </div>
                                <div className="col-6 p-0 d-flex align-items-center">
                                    <button className='ms-auto btn p-2 text-white bg-danger' type='submit' onClick={() => setRole('admin')}>Login as admin</button>
                                </div>
                            </div>
                            {/* <div className="mb-3 d-flex justify-content-end ">
            <button className='btn bg-primary text-white' type='submit'>Login</button>
        </div> */}
                        </form>

                    </div>
                </div>
            </div>

            <ToastContainer />
        </>
    )
}

