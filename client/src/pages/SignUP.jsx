import React from "react";
import { Link } from "react-router-dom";

function SignUP() {
  return (
    <div className="p-10 mt-10 max-w-md mx-auto bg-slate-200 rounded-lg ">
      <h1 className="text-3xl text-center font-bold uppercase mb-3">SignUP</h1>
      <form className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="username"
          id="username"
          className="border p-2 rounded-md"
        />
        <input
          type="text"
          placeholder="email"
          id="email"
          className="border p-2 rounded-md"
        />
        <input
          type="text"
          placeholder="password"
          id="password"
          className="border p-2 rounded-md"
        />
        <button className="bg-[#232830] text-white uppercase rounded-lg p-3 hover:opacity-80 disabled:opacity-60">
          Sign Up
        </button>
        <div className="flex gap-2">
          <p>Have an account?</p>
          <Link to={"/login"}>
            <button className="text-[#06bfe2] hover:underline">Login</button>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default SignUP;
