// import React from 'react';

const HomePage = () => {
  return (
    <div className="flex-grow p-4 w-[87.5vw] h-[87.5vh] mr-16 ml-48 bg-blue-200 ">
        <div className="container flex justify-center">
            <div className="my-10" id="Texts">
                <h1 className="text-3xl font-bold text-center mb-4">CollabSpace</h1>
                <p className="text-lg text-center mb-2 font-semibold">The platform for better cooperation</p>
                <p className="text-lg mb-2 font-semibold text-center">Crafted with care & creativity.</p>
                <p className="text-lg mb-2 font-semibold text-center">Brings together everything in one place.</p>
            </div>
            <div className="image">
                <img src="..\public\images\collab.png" alt="" className="size-52" />
            </div>
        </div>
        <div className="text-center">
            <div className="buttons flex gap-1 justify-center">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">My Teams</button>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">My Projects</button> 
            </div>
      </div>
    </div>
  );
};

export default HomePage;