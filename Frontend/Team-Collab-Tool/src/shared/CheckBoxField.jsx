import { Tooltip } from "react-tooltip";
import { Link } from "react-router-dom";

const CheckboxField = ({ id, register, serverError, label, linkText, linkUrl }) => {
  return (
    <div className="flex flex-col justify-start mb-4 gap-1">
      <div className="flex items-center">
        <input
          {...register(id)}
          type="checkbox"
          id={id}
          className={`w-4 h-4 mr-2 text-blue-600 ring-opacity-50 focus:outline-none focus:shadow-outline`}
          value={true}
          data-tooltip-id={`${id}-tooltip`}
          data-tooltip-content={
            serverError ? "Accept the terms and conditions" : ""
          }
        />
        <label
          htmlFor={id}
          className={`ml-2 ${
            serverError ? "text-red-500" : "text-gray-700"
          }`}
        >
          {label}{" "}
          <Link to={linkUrl} className="hover:text-[#12aef5]">
            {linkText}
          </Link>
        </label>
      </div>
      <Tooltip id={`${id}-tooltip`} />
    </div>
  );
};

export default CheckboxField;
