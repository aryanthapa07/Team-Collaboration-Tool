import Hamburger from "../shared/Hamburger";
import Logo from "../shared/logo";
import { getToken } from "../services/LocalStorageService";
// renders the after login header
const Dashboardheader = () => {
  const { access_token } = getToken();
  const isLoggedIn = Boolean(access_token);
  return (
    <div className="flex bg-white justify-between items-center fixed z-40 top-0 left-0 w-full shadow-sm py-1">
      <Logo />
      <div className="relative">
        <Hamburger isLoggedIn={isLoggedIn} />
      </div>
    </div>
  );
};

export default Dashboardheader;
