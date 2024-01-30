import React from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="bg-[#232830] h-20 text-white">
      <div className="flex justify-between items-center p-3 max-w-6xl">
        <span className="font-extrabold text-sm sm:text-xl">YS</span>
        <form className="bg-white p-3 rounded text-[#1C274C] flex items-center">
          <input
            type="text"
            placeholder="search....."
            className="bg-transparent focus:outline-none w-24 sm:w-64"
          ></input>
          <FaSearch />
        </form>
        <ul className="flex gap-5 ">
          <Link to={"/"}>
            <li className="hidden sm:inline font-extrabold hover:underline">
              Home
            </li>
          </Link>
          <Link to={"/about"}>
            <li className="hidden sm:inline font-extrabold hover:underline">
              About
            </li>
          </Link>
          <Link to={"/login"}>
            <li className="font-extrabold hover:underline">Sign In</li>
          </Link>
        </ul>
      </div>
    </header>
  );
}

export default Header;
