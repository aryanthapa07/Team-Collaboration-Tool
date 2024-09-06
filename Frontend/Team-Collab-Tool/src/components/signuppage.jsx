import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useRegisterUserMutation } from "../services/userAuthApi";
import { useState } from "react";
import { storeToken } from "../services/LocalStorageService";
import CircularProgress from "@mui/joy/CircularProgress";
import { toast, Toaster } from "react-hot-toast";
import InputField from "../shared/InputField";
import CheckboxField from "../shared/CheckBoxField";
const SignupPage = () => {
  const [server_error, setServerError] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [registerUser] = useRegisterUserMutation();
  const navigate = useNavigate();
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
        navigate("/dashboard");
      }, 2000);
    }
  };

  return (
    <div className="authFormContainer">
      <Toaster position="top-center" reverseOrder={false} />
      <h1 className="authpageHeading">Register</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="authForm">
        <InputField
          label="Email"
          type="email"
          name="email"
          register={register}
          error={server_error.email}
          tooltipId="email-tooltip"
          placeholder="Email"
        />
        <InputField
          label="Name"
          type="text"
          name="name"
          register={register}
          error={server_error.name}
          tooltipId="name-tooltip"
          placeholder="Name"
        />
        <InputField
          label="Password"
          type="password"
          name="password"
          register={register}
          error={server_error.password}
          tooltipId="password-tooltip"
          placeholder="Password"
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
        <CheckboxField
          id="tc"
          register={register}
          serverError={server_error.tc}
          label="I agree to the"
          linkText="Terms and Conditions"
          linkUrl="/terms-and-conditions"
        />
        <div className="flex items-center justify-between">
          <button onClick={loginnavigate} className="authFormText">
            Already have an account? Login
          </button>
          <button className="bluebutton" type="submit" disabled={isSubmitting}>
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
