import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useRegisterUserMutation } from "../services/userAuthApi";
import { useState } from "react";
import { storeToken } from "../services/LocalStorageService";
const SignupPage = () => {
  const [serverError,setServerError]=useState()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    getValues,
  } = useForm();

  const delay = (d) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, d * 1000);
    });
  };

  const navigate = useNavigate();

  const [registerUser] = useRegisterUserMutation()
  const onSubmit = async (data) => {
    await delay(2);
    const actualData={
      name: data.name,
      email: data.email,
      password: data.password,
      password2: data.password2,
      tc:data.tc,
    }
    const res=await registerUser(actualData)
    if(res.error){
      setServerError(res.error.data.errors)
    }
    if(res.data){
      console.log(res.data)
      storeToken(res.data.token)
      navigate("/login");
    }
    // console.log(res);
    // console.log("data",data);
    // console.log("actualdata",actualData);
  };

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-3xl font-bold text-center mb-4">Signup</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md mx-auto">
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            {...register("email", { required: true })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Email"
          />
          {errors.email && <div className="text-red-700">*Email field is required</div>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
            Name
          </label>
          <input
            {...register("name", { required: true })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            placeholder="Name"
          />
          {errors.name && <div className="text-red-700">*name field is required</div>}
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            {...register("password", { required: true, minLength: 8 })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Password"
          />
          {errors.password && (
            <div className="text-red-700">
              {errors.password.type === "required" && "*password field is required"}
              {errors.password.type === "minLength" && "*Minimum length for password is 8"}
            </div>
          )}
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="password2">
            Confirm Password
          </label>
          <input
            {...register("password2", {
              required: true,
              validate: (value) =>
                value === getValues().password || "*Passwords do not match",
            })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password2"
            type="password"
            placeholder="Confirm Password"
          />
          {errors.password2 && <div className="text-red-700">{errors.password2.message}</div>}
        </div>
        <div className="flex items-center mb-4">
          <input
            {...register("tc", { required: true })}
            type="checkbox"
            id="tc"
            className="w-4 h-4 mr-2 text-blue-600 focus:ring-blue-500 ring-opacity-50"
            value={true}
          />
          <label htmlFor="tc" className="ml-2 text-gray-700">
            I agree to the Terms and Conditions
          </label>
          {errors.tc && <div className="text-red-700">*Please accept the Terms and Conditions</div>}
        </div>
        <div className="flex items-center justify-between">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit" disabled={isSubmitting}>
            Signup
          </button>
          <button onClick={navigate("/login")} className="inline-block align-baseline text-sm font-semibold text-indigo-500 hover:text-indigo-800" href="#">
            Already have an account? Login
          </button>
        </div>
      </form>
      {isSubmitting && <div className="text-center font-semibold">Loading...</div>}
    </div>
  );
};

export default SignupPage;