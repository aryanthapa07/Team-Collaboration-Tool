import { getToken } from "../services/LocalStorageService";
import { useGetLoggedUserQuery } from "../services/UserAuthApi";
const HomepageTexts = () => {
  const {access_token} = getToken();
  const {data:userData}=useGetLoggedUserQuery(access_token);
  return (
    <div className="homePageContainer ">
      <div className="my-10" id="Texts" >
        <h1 className="headingText">
          Welcome to <span className="text-[#12aef5]">CollabSpace Test</span>{" "}
        </h1>
        <p className="paraText">{userData?.is_admin?"Manage Users":"The platform for better cooperation"}</p>
        <p className="paraText">{userData?.is_admin?"Customize Workspaces":"Crafted with care & creativity."}</p>
        <p className="paraText">{userData?.is_admin?"Generate Reports to track progress" :"Brings together everything in one place."}</p>
      </div>
      <div className="image">
        <img src="\images\Homepageimg.png" alt="" className="size-64" />
      </div>
    </div>
  );
};

export default HomepageTexts;
