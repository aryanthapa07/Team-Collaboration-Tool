import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useRegisterUserMutation } from "../services/userAuthApi";
import { useState } from "react";
import { storeToken } from "../services/LocalStorageService";
import { FaEye, FaEyeSlash } from "react-icons/fa";
const SignupPage = () => {
  const [serverError, setServerError] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    getValues,
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
    const actualData = {
      name: data.name,
      email: data.email,
      password: data.password,
      password2: data.password2,
      tc: data.tc,
    };
    const res = await registerUser(actualData);
    if (res.error) {
      setServerError(res.error.data.errors);
    }
    if (res.data) {
      console.log(res.data);
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
            {...register("email", { required: true })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Email"
          />
          {errors.email && (
            <div className="text-red-700">*Email field is required</div>
          )}
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
          {errors.name && (
            <div className="text-red-700">*name field is required</div>
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
            {...register("password", { required: true, minLength: 8 })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
          />
          <button
            className="absolute right-2 bottom-2.5 "
            onClick={togglepasswordview}
            type="button"
          >
            {showPassword ? <FaEye /> : <FaEyeSlash />}
          </button>
          {errors.password && (
            <div className="text-red-700">
              {errors.password.type === "required" &&
                "*password field is required"}
              {errors.password.type === "minLength" &&
                "*Minimum length for password is 8"}
            </div>
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
            {...register("password2", {
              required: true,
              validate: (value) =>
                value === getValues().password || "*Passwords do not match",
            })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password2"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm Password"
          />
          <button
            className="absolute right-2 bottom-2.5"
            onClick={toggleconfirmpassword}
            type="button"
          >
            {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
          </button>
          {errors.password2 && (
            <div className="text-red-700">{errors.password2.message}</div>
          )}
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
          {errors.tc && (
            <div className="text-red-700">
              *Please accept the Terms and Conditions
            </div>
          )}
        </div>
        <div className="flex items-center justify-between">
          <button
            onClick={loginnavigate}
            className="inline-block align-baseline text-sm font-semibold text-indigo-500 hover:text-indigo-800"
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
        <div className="text-center font-semibold">Loading...</div>
      )}
    </div>
  );
};

export default SignupPage;
