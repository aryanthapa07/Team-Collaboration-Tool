import Hamburger from "../shared/Hamburger";
import Authbuttons from "../shared/Authbuttons";
import Logo from "../shared/logo";
import { getToken } from "../services/LocalStorageService";

const Header = () => {
  const { access_token } = getToken();
  const isLoggedIn = Boolean(access_token);

  return (
    <div className="flex bg-white justify-between items-center fixed z-40 top-0 left-0 w-full shadow-sm py-1">
      <Logo />
      <div className="relative">
        <Hamburger isLoggedIn={isLoggedIn} />
        {!isLoggedIn && (
          <div className="hidden md:flex gap-4 px-7">
            <Authbuttons />
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
