// import React from 'react'
import { FcCollaboration } from "react-icons/fc";
import { useEffect, useState } from "react";
import { getToken } from "../services/LocalStorageService";
import { useGetLoggedUserQuery } from "../services/userAuthApi";
function Dashboardheader() {
    const {access_token}=getToken()
    const {data,isSuccess}=useGetLoggedUserQuery(access_token)

    const [userData,setUserData] = useState({
        email:"",
        name:""
    })

    useEffect(()=>{
        if(data && isSuccess){
            setUserData({
                email:data.email,
                name:data.name,
            })
        }
    },[data,isSuccess])
    console.log(data)

    return (
        <div className="flex bg-blue-950 py-5 justify-between">
                <div className="text-white font-bold px-7 py-2 flex gap-1"><FcCollaboration className="size-7 "/><h1 className="my-1">CollabSpace</h1></div>
                <div className="flex gap-4 px-7">
                    <h1 className="text-white font-bold px-7 py-2 text-xl">Hi {userData.name}</h1>
                </div>
        </div>
    )
}

export default Dashboardheader
