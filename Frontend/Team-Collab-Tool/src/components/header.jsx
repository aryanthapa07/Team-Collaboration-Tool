import { FcCollaboration } from "react-icons/fc";
import { Link } from "react-router-dom";

const Header = () => {

  return (
<div className="flex bg-blue-950 py-5 justify-between">
        <div className="text-white font-bold px-7 py-2 flex gap-1"><FcCollaboration className="size-8"/><h1 className="my-1">CollabSpace</h1></div>
        <div className="flex gap-4 px-7">
            <Link to="/login"><button className="hover:bg-blue-500 transition-all duration-400 text-white cursor-pointer font-lightbold bg-blue-700 p-2 rounded-md font-bold">Login</button></Link>
            <Link to="/signup"><button className="hover:bg-blue-500 transition-all duration-400 text-white cursor-pointer font-lightbold bg-blue-700 p-2 rounded-md font-bold">Signup</button></Link>
        </div>
    </div>
  )
}

export default Header
