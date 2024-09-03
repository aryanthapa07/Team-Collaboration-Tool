// import React from 'react'
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useResetUserPasswordMutation } from "../services/userAuthApi";
import { toast } from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import InputField from "../shared/InputField";
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
        navigate("/dashboard");
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
        <InputField
          label="New Password"
          type="password"
          name="password"
          register={register}
          error={server_error.password}
          tooltipId="password-tooltip"
          placeholder="New Password"
          showPassword={showPassword}
          togglePassword={togglepasswordview}
        />
        <InputField
          label="Confirm Password"
          type="password"
          name="password2"
          register={register}
          error={server_error.password2}
          tooltipId="password2-tooltip"
          placeholder="Confirm Password"
          showPassword={showConfirmPassword}
          togglePassword={toggleconfirmpassword}
        />
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
