import Hamburger from "../shared/Hamburger";
import Authbuttons from "../shared/Authbuttons";
import Logo from "../shared/logo";
const Header = () => {
  return (
    <div className="flex bg-white justify-between items-center fixed z-40 top-0 left-0 w-full shadow-sm py-1">
      <Logo />
      <div className="relative">
        <Hamburger />
        <Authbuttons />
      </div>
    </div>
  );
};

export default Header;
