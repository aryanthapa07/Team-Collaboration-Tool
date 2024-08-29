// import React from 'react'
import { useState } from "react"
import { useForm } from "react-hook-form"
import { useResetUserPasswordMutation } from "../services/userAuthApi"
import { useNavigate } from "react-router-dom"
function Forgetpass() {
    const [server_error, setServerError] = useState({})
    const [server_msg, setServerMsg] = useState({})
    const navigate = useNavigate()
    const[resetUserPassword]=useResetUserPasswordMutation()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()
    const onSubmit = async(data) => {
        console.log(data)
        const actualData={
        email:data.Email,
        password:data.password,
        password2:data.password2
        }
        const res=await resetUserPassword(actualData)
        if(res.error){
            setServerMsg({})
            setServerError(res.error.data.errors)
            console.log(res.error)
        }
        if (res.data) {
            setServerError({})
            setServerMsg(res.data)
            document.getElementById('password-reset-form').reset()
            setTimeout(() => {
              navigate("/login")
            }, 2000)
        }
    }
  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-center font-bold text-3xl mb-4">Reset Password</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md mx-auto" id="password-reset-form">
        <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="Email">Email</label>
            <input {...register("Email",{ required: true })} type="email" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Email" name="Email" autoComplete="Email" id="Email"/>
            {errors.Email && <div className="text-red-700">*Email field is required</div>}
        </div>
        <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="password">New Password</label>
            <input {...register("password",{ required: {value:true,message:"*password field is required"} })} type="password" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="New Password" name="password" id="password"/>
            {errors.password && <div className="text-red-700">{errors.password.message}</div>}
        </div>
        <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="password2">Confirm Password</label>
            <input {...register("password2",{ required: {value:true,message:"*password field is required"} })} type="password" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Confirm Password" name="password2" id="password2"/>
            {errors.password2 && <div className="text-red-700">{errors.password.message}</div>}
        </div>
        <div className="flex items-center justify-between">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"type="submit">Save</button>
        </div>
        {server_error.non_field_errors ? <div className="text-red-700">{server_error.non_field_errors[0]}</div> : ''}
        {server_msg.msg ? <div className="text-green-700">{server_msg.msg}</div> : ''}
      </form>
    </div>
  )
}

export default Forgetpass
