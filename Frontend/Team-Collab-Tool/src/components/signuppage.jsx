import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterUserMutation } from "../services/userAuthApi";
import { useState } from "react";
import { storeToken } from "../services/LocalStorageService";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import CircularProgress from "@mui/joy/CircularProgress";
import { Alert } from "@mui/material";
const SignupPage = () => {
  const [server_error, setServerError] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  const togglepasswordview = () => {
    setShowPassword(!showPassword);
  };
  const toggleconfirmpassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const navigate = useNavigate();

  const [registerUser] = useRegisterUserMutation();
  const loginnavigate = () => {
    navigate("/login");
  };
  const onSubmit = async (data) => {
    console.log("data sent from frontend", data);
    const actualData = {
      name: data.name,
      email: data.email,
      password: data.password,
      password2: data.password2,
      tc: data.tc ? data.tc : undefined,
    };
    const res = await registerUser(actualData);
    console.log("response from backend", res);
    if (res.error) {
      setServerError(res.error.data.errors);
    }
    if (res.data) {
      storeToken(res.data.token);
      navigate("/login");
    }
  };

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-3xl font-bold text-center mb-4">Register</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md mx-auto"
      >
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            {...register("email")}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Email"
          />
          {server_error.email ? (
            <span style={{ fontSize: 12, color: "red" }}>
              {server_error.email[0]}
            </span>
          ) : (
            ""
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
            Name
          </label>
          <input
            {...register("name")}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            placeholder="Name"
          />
          {server_error.name ? (
            <span style={{ fontSize: 12, color: "red" }}>
              {server_error.name[0]}
            </span>
          ) : (
            ""
          )}
        </div>
        <div className="mb-6 relative">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            {...register("password")}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
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
            <span style={{ fontSize: 12, color: "red" }}>
              {server_error.password[0]}
            </span>
          ) : (
            ""
          )}
        </div>
        <div className="mb-6 relative">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="password2"
          >
            Confirm Password
          </label>
          <input
            {...register("password2")}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password2"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm Password"
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
            <span style={{ fontSize: 12, color: "red" }}>
              {server_error.password2[0]}
            </span>
          ) : (
            ""
          )}
        </div>
        <div className="flex flex-col justify-start mb-4 gap-1">
          <div className="flex items-center">
            <input
              {...register("tc")}
              type="checkbox"
              id="tc"
              className="w-4 h-4 mr-2 text-blue-600 focus:ring-blue-500 ring-opacity-50"
              value={true}
            />
            <label htmlFor="tc" className="ml-2 text-gray-700">
              I agree to the{" "}
              <Link className="hover:text-[#12aef5]">Terms and Conditions</Link>
            </label>
          </div>
          {server_error.tc ? (
            <span style={{ fontSize: 12, color: "red" }}>
              {server_error.tc[0]}
            </span>
          ) : (
            ""
          )}
        </div>
        <div className="flex items-center justify-between">
          <button
            onClick={loginnavigate}
            className="inline-block align-baseline text-sm font-semibold text-[#12aef5] hover:opacity-80"
          >
            Already have an account? Login
          </button>
          <button
            className="bg-[#12aef5] hover:opacity-80 text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            Register
          </button>
        </div>
        {server_error.non_field_errors ? (
          <Alert severity="error" className="mt-2">{server_error.non_field_errors[0]}</Alert>
        ) : (
          ""
        )}
      </form>
      {isSubmitting && (
        <div className="text-center font-semibold">
          <CircularProgress variant="solid" />
        </div>
      )}
    </div>
  );
};

export default SignupPage;
