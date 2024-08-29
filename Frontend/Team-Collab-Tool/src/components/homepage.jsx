// import React from 'react';

const HomePage = () => {
  return (
    <div className="flex size-full flex-col items-center justify-center gap-2 px-4">
        <div className="container flex flex-wrap items-center justify-center md:-mt-14">
            <div className="my-10" id="Texts">
                <h1 className="text-3xl font-bold text-center mb-4">Welcome to <span className="text-[#12aef5]">CollabSpace</span> </h1>
                <p className="text-lg text-center mb-2 font-semibold">The platform for better cooperation</p>
                <p className="text-lg mb-2 font-semibold text-center">Crafted with care & creativity.</p>
                <p className="text-lg mb-2 font-semibold text-center">Brings together everything in one place.</p>
            </div>
            <div className="image">
                <img src="\images\collab.png" alt="" className="size-64" />
            </div>
        </div>
        
            <div className="buttons flex justify-center gap-4">
                <button className="bg-[#12aef5] hover:opacity-80 text-white font-bold py-2 px-4 rounded">My Teams</button>
                <button className="bg-[#12aef5] hover:opacity-80 text-white font-bold py-2 px-4 rounded">My Projects</button> 
            </div>
     
    </div>
  );
};

export default HomePage;