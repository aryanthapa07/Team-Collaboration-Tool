// import React from 'react';
import Bluebutton from "../buttons/Bluebutton";
import HomepageTexts from "../shared/HomepageTexts";
const LoggedinHomepage = () => {
  return (
    <div className="flex size-full flex-col items-center justify-center gap-2 px-4">
      <HomepageTexts/>
      <div className="buttons flex justify-center gap-4">
        <Bluebutton text="My Workspace"/>
        <Bluebutton text="My Projects"/>
      </div>
    </div>
  );
};

export default LoggedinHomepage;
