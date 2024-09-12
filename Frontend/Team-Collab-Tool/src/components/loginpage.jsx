import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../services/UserAuthApi";
import { useState } from "react";
import { Link } from "react-router-dom";
import { storeToken } from "../services/LocalStorageService";
import { toast } from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import InputField from "../shared/InputField";
import ProgressBar from "../shared/ProgressBar";
const LoginPage = () => {
  const [serverError, setServerError] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  const togglepassword = () => {
    setShowPassword(!showPassword);
  };

  const navigate = useNavigate();
  const [LoginUser] = useLoginUserMutation();

  const registernavigate = () => {
    navigate("/signup");
  };

  // fetching data from form onsubmit
  const onSubmit = async (data) => {
    console.log("data from frontend", data);
    const actualData = {
      email: data?.Email,
      password: data?.password,
    };

    // data sent to backend and backend response stored in res
    const res = await LoginUser(actualData);

    if (res.error) {
      console.log("inside res.error", res);
      setServerError(res.error.data.errors);
      if (res.error.data.errors.non_field_errors) {
        toast.error(res.error.data.errors.non_field_errors[0], {
          duration: 3000, // Toast will be visible for 3 seconds
        });
      }
      console.log(res.error);
    }

    if (res.data) {
      console.log("inside res.data", res.data);
      toast.success(res.data.msg, {
        duration: 2000, // Toast will be visible for 2 seconds
      });
      setTimeout(() => {
        storeToken(res.data.token);
        navigate("/dashboard");
      }, 750);
    }
  };

  return (
    <div className="authFormContainer">
      <Toaster position="top-center" reverseOrder={false} />
      <h1 className="authpageHeading">Login</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="authForm">
        <InputField
          label="Email"
          type="email"
          name="Email"
          register={register}
          error={serverError?.email}
          tooltipId="email-tooltip"
          placeholder="Email"
        />
        <InputField
          label="Password"
          type="password"
          name="password"
          register={register}
          error={serverError?.password}
          tooltipId="password-tooltip"
          placeholder="Password"
          showPassword={showPassword}
          togglePassword={togglepassword}
        />

        <div className="flex flex-col justify-between gap-2">
          <div className="flex justify-between">
            <button
              onClick={registernavigate}
              type="button"
              className="authFormText"
            >
              New to CollabSpace? Register
            </button>
            <Link className="authFormText" to="/reset-password-email">
              Forgot Password?
            </Link>
          </div>

          <button className="bluebutton" type="submit" disabled={isSubmitting}>
            Login
          </button>
        </div>
      </form>
      {isSubmitting && <ProgressBar />}
    </div>
  );
};

export default LoginPage;
