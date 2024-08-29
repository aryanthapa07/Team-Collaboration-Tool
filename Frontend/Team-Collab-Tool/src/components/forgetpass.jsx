// import React from 'react'
function Forgetpass() {
  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-center font-bold text-3xl mb-4">Reset Password</h1>
      <form className="w-full max-w-md mx-auto">
        <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="email">Email</label>
            <input type="email" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Email" name="Email" autoComplete="Email" id="email"/>
        </div>
        <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="password">New Password</label>
            <input type="password" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="New Password" name="password" id="password"/>
        </div>
        <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="password2">Confirm Password</label>
            <input type="password" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Confirm Password" name="password2" id="password2"/>
        </div>
        <div className="flex items-center justify-between">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"type="submit">Save</button>
        </div>
      </form>
    </div>
  )
}

export default Forgetpass
