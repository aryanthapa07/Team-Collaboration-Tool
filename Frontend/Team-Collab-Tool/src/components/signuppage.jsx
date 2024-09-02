import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterUserMutation } from "../services/userAuthApi";
import { useState } from "react";
import { storeToken } from "../services/LocalStorageService";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import CircularProgress from "@mui/joy/CircularProgress";
import { toast } from "react-hot-toast";
import { Toaster } from "react-hot-toast";
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
      if (res.error.data.errors.non_field_errors) {
        toast.error(res.error.data.errors.non_field_errors[0], {
          duration: 3000, // Toast will be visible for 3 seconds
        });
      }
      if (
        res.error.data.errors.email == "user with this Email already exists."
      ) {
        toast.error(res.error.data.errors.email, {
          duration: 3000, // Toast will be visible for 3 seconds
        });
      }
    }
    if (res.data) {
      toast.success(res.data.msg, {
        duration: 2000, // Toast will be visible for 2 seconds
      });
      setTimeout(() => {
        storeToken(res.data.token);
        navigate("/login");
      }, 2000);
    }
  };

  return (
    <div className="container mx-auto mt-10">
      <Toaster position="top-center" reverseOrder={false} />
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
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 ${
              server_error.email
                ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                : "focus:ring-blue-500 focus:border-blue-500"
            }`}
            id="email"
            type="email"
            placeholder="Email"
          />
          {server_error.email == "This field may not be blank." ? (
            <span className="text-red-700 text-[12px]">
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
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 ${
              server_error.name
                ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                : "focus:ring-blue-500 focus:border-blue-500"
            }`}
            id="name"
            type="text"
            placeholder="Name"
          />
          {server_error.name ? (
            <span className="text-red-700 text-[12px]">
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
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 ${
              server_error.password
                ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                : "focus:ring-blue-500 focus:border-blue-500"
            }`}
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
            <span className="text-red-700 text-[12px]">
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
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 ${
              server_error.password2
                ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                : "focus:ring-blue-500 focus:border-blue-500"
            }`}
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
            <span className="text-red-700 text-[12px]">
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
            <span className="text-red-700 text-[12px]">
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
            disabled={isSubmitting}
          >
            Register
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
};

export default SignupPage;
