import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../services/userAuthApi";
import { useState } from "react";
import { Link } from "react-router-dom";
import { storeToken } from "../services/LocalStorageService";
const LoginPage = () => {
  const [serverError,setServerError]=useState()
  const {
    register,
    handleSubmit,
    formState: { errors,isSubmitting },
  } = useForm()
  const navigate=useNavigate();
  const [LoginUser,] = useLoginUserMutation()
  const delay=(d)=>{
    return new Promise((resolve)=>{
      setTimeout(()=>{
        resolve()
      },d*1000)
    })
  }
  const onSubmit = async(data) => {
    await delay(2)
    const actualData={
      email:data.Email,
      password:data.password
    }
    const res=await LoginUser(actualData)
    if(res.error){
      setServerError(res.error.data.errors)
    }
    if(res.data){
      console.log(res.data)
      storeToken(res.data.token)
      navigate("/dashboard");
    }
    console.log(res)
    // console.log("ad",actualData)
    // console.log(data)
  }
  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-3xl font-bold text-center mb-4">Login</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md mx-auto">
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="email">Email</label>
          <input  {...register("Email",{ required: true })} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="email" placeholder="Email" name="Email" autoComplete="Email" id="email"/>
          {errors.Email && <div className="text-red-700">*Email field is required</div>}
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="password" autoComplete="password">Password</label>
          <input {...register("password",{ required: {value:true,message:"*password field is required"},minLength:{value:8,message:"*Minimum length for password is 8"} })}className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="password" placeholder="Password" name="password" id="password"/>
          {errors.password && <div className="text-red-700">{errors.password.message}</div>}
        </div>
        <div className="flex items-center justify-between">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"type="submit" disabled={isSubmitting}>Login</button>
          <Link className="inline-block align-baseline text-sm font-semibold text-indigo-500 hover:text-indigo-800" to="/forgetpassword">Forgot Password?</Link>
        </div>
      </form>
      {isSubmitting && <div className="text-center font-semibold">Loading...</div>}
      
    </div>
  );
};

export default LoginPage;