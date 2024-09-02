// import React from 'react'
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSendPasswordResetEmailMutation } from "../services/userAuthApi";
import { toast } from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import CircularProgress from "@mui/joy/CircularProgress";
function Forgetpass() {
  const [server_error, setServerError] = useState({});
  const [sendPasswordResetEmail] = useSendPasswordResetEmailMutation();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();
  const onSubmit = async (data) => {
    console.log("data from frontend", data);
    const actualData = {
      email: data.Email,
    };
    const res = await sendPasswordResetEmail(actualData);
    if (res.error) {
      console.log("inside res.error", res);
      setServerError(res.error.data.errors);
      if (res.error.data.errors.non_field_errors) {
        toast.error(res.error.data.errors.non_field_errors[0], {
          duration: 4000, // Toast will be visible for 4 seconds
        });
      }
      console.log(res.error);
    }
    if (res.data) {
      console.log("inside res.data", res);
      toast.success(res.data.msg, {
        duration: 4000, // Toast will be visible for 4 seconds
      });
      setServerError({});
      document.getElementById("password-reset-form").reset();
    }
  };
  return (
    <div className="container mx-auto mt-10">
      <Toaster position="top-center" reverseOrder={false} />
      <h1 className="text-center font-bold text-3xl mb-4">
        Send Reset Password Link
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md mx-auto"
        id="password-reset-form"
      >
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="Email">
            Email
          </label>
          <input
            {...register("Email")}
            type="email"
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 ${
              server_error.email
                ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                : "focus:ring-blue-500 focus:border-blue-500"
            }`}
            placeholder="Email"
            name="Email"
            autoComplete="Email"
            id="Email"
          />
          {server_error.email ? (
            <span className="text-red-700 text-[12px]">
              {server_error.email[0]}
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
            Send
          </button>
        </div>
      </form>
      {isSubmitting && (
        <div className="text-center font-semibold">
          <CircularProgress variant="solid" />
        </div>
      )}
    </div>
  );
}

export default Forgetpass;
