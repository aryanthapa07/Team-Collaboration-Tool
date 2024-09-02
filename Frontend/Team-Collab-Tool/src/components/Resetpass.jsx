// import React from 'react'
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { useResetUserPasswordMutation } from "../services/userAuthApi";
import { toast } from "react-hot-toast";
import { Toaster } from "react-hot-toast";
function Resetpass() {
  const [server_error, setServerError] = useState({});
  const [resetUserPassword] = useResetUserPasswordMutation();
  const { id, token } = useParams();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const togglepasswordview = () => {
    setShowPassword(!showPassword);
  };
  const toggleconfirmpassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    console.log("data fromfrontend", data);
    const actualdata = {
      password: data.password,
      password2: data.password2,
    };
    const res = await resetUserPassword({ actualdata, id, token });
    if (res.error) {
      console.log("inside res.error", res);
      if (res.error.data.errors.non_field_errors) {
        toast.error(res.error.data.errors.non_field_errors[0], {
          duration: 3000, // Toast will be visible for 3 seconds
        });
      }
      setServerError(res.error.data.errors);
    }
    if (res.data) {
      console.log("inside res.data", res);
      toast.success(res.data.msg, {
        duration: 2000, // Toast will be visible for 2 seconds
      });
      setServerError({});
      document.getElementById("password-reset-form").reset();
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
  };
  return (
    <div className="container mx-auto mt-10">
      <Toaster position="top-center" reverseOrder={false} />
      <h1 className="text-center font-bold text-3xl mb-4">Reset Password</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md mx-auto"
        id="password-reset-form"
      >
        <div className="mb-4 relative">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="password"
          >
            New Password
          </label>
          <input
            {...register("password")}
            type={showPassword ? "text" : "password"}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 ${
              server_error.password
                ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                : "focus:ring-blue-500 focus:border-blue-500"
            }`}
            placeholder="New Password"
            name="password"
            id="password"
          />
          <button
            className={
              server_error.password
                ? "absolute right-2 bottom-8"
                : "absolute right-2 bottom-2.5"
            }
            onClick={togglepasswordview}
            type="button"
          >
            {showPassword ? <FaEye /> : <FaEyeSlash />}
          </button>
          {server_error.password ? (
            <span className="text-red-700 text-[12px]">
              {server_error.password[0]}
            </span>
          ) : (
            ""
          )}
        </div>
        <div className="mb-4 relative">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="password2"
          >
            Confirm Password
          </label>
          <input
            {...register("password2")}
            type={showConfirmPassword ? "text" : "password"}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 ${
              server_error.password2
                ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                : "focus:ring-blue-500 focus:border-blue-500"
            }`}
            placeholder="Confirm Password"
            name="password2"
            id="password2"
          />
          <button
            className={
              server_error.password2
                ? "absolute right-2 bottom-8"
                : "absolute right-2 bottom-2.5"
            }
            onClick={toggleconfirmpassword}
            type="button"
          >
            {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
          </button>
          {server_error.password2 ? (
            <span className="text-red-700 text-[12px]">
              {server_error.password2[0]}
            </span>
          ) : (
            ""
          )}
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            type="submit"
            disabled={isSubmitting}
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}

export default Resetpass;
