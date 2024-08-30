import Loggedinhamburger from "../shared/Loggedinhamburger";
import Logo from "../shared/logo";
// renders the after login header
const Dashboardheader = () => {
  return (
    <div className="flex bg-white justify-between items-center fixed z-40 top-0 left-0 w-full shadow-sm py-1">
      <Logo />
      <div className="relative">
        <Loggedinhamburger />
      </div>
    </div>
  );
};

export default Dashboardheader;
