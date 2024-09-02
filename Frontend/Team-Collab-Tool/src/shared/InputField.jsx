import { Tooltip } from "react-tooltip";
import { FaEye, FaEyeSlash } from "react-icons/fa";

// renders the input field for login signup forms
const InputField = ({
  label,
  type,
  name,
  register,
  error,
  tooltipId,
  placeholder,
  showPassword,
  togglePassword,
}) => (
  <div className="mb-4 relative">
    <label className="block text-gray-700 font-bold mb-2" htmlFor={name}>
      {label}
    </label>
    <input
      {...register(name)}
      className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
        error ? "border-red-500 " : ""
      }`}
      type={type === "password" && showPassword ? "text" : type}
      placeholder={placeholder}
      name={name}
      id={name}
      data-tooltip-id={tooltipId}
      data-tooltip-content={error ? error[0] : ""}
    />
    {type === "password" && (
      <button
        className="absolute right-2 bottom-2.5"
        onClick={togglePassword}
        type="button"
      >
        {showPassword ? <FaEye /> : <FaEyeSlash />}
      </button>
    )}
    <Tooltip id={tooltipId} />
  </div>
);

export default InputField;
