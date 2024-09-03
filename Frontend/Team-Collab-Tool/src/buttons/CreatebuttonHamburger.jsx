const CreatebuttonHamburger = ({ isActive, onClick, text, Icon }) => {
  return (
    <button
      className={`border border-gray-400 py-2.5 mb-4 ${
        isActive
          ? "bg-[#12aef5] text-white"
          : "hover:bg-[#12aef5] hover:text-white"
      } rounded-xl mx-auto w-[85%] mt-4 flex items-center justify-center gap-1`}
      onClick={onClick}
    >
      <span className="text-lg">{text}</span>
      {Icon && <Icon />}
    </button>
  );
};

export default CreatebuttonHamburger;
