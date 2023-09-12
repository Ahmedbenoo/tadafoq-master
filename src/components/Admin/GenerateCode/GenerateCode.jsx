import React from "react";



export default function GenerateCode(){





async function Generate(id){
    try {
        let response = await axios.post(`http://127.0.0.1:8000/api/dashboard/users/generate-update-code/${id}`, {
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
            });})
    } catch (error) {
        
    }
}







    return(
        <>
        <div className="container">
            <div className="row">
                <button >Generate code</button>
            </div>
        </div>
        </>
    )
}