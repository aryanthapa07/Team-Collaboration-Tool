import { useEffect, useState } from "react";
import { getToken } from "../services/LocalStorageService";
import { useGetLoggedUserQuery } from "../services/userAuthApi";

function Greetings() {
  // getting the access token of the user to show user data dynamically in the hamburger
  const { access_token } = getToken();
  const { data, isSuccess } = useGetLoggedUserQuery(access_token);
  const [userData, setUserData] = useState({ email: "", name: "" });

  useEffect(() => {
    if (data && isSuccess) {
      setUserData({ email: data.email, name: data.name });
    }
  }, [data, isSuccess]);

  return (
    <h1 className="text-[#12aef5] font-bold px-7 py-2 text-xl">
      Hi {userData.name}
    </h1>
  );
}

export default Greetings;
