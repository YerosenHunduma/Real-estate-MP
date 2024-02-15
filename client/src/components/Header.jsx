import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signOutUserFailure,
  signOutUserStart,
  signOutUserSuccess,
} from "../redux/user/userSlice";
import { signOutUser } from "../apiCalls/user";

function Header() {
  const { user } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onClickHandler = async (e) => {
    try {
      dispatch(signOutUserStart());
      const response = await signOutUser();

      if (response.success === false) {
        dispatch(signOutUserFailure(response.message));
        return;
      }
      dispatch(signOutUserSuccess());
    } catch (error) {
      dispatch(signOutUserFailure(error.message));
    }
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);
    const urlQuery = urlParams.toString();
    navigate(`/search?${urlQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermUrl = urlParams.get("searchTerm");
    if (searchTermUrl) {
      setSearchTerm(searchTermUrl);
    }
  }, [location.search]);
  return (
    <header className="bg-[#232830] h-20 text-white">
      <div className="flex justify-between items-center p-3 max-w-7xl ">
        <Link to={"/"}>
          <span className="font-extrabold text-sm sm:text-xl">YS</span>
        </Link>
        <form
          onSubmit={onSubmitHandler}
          className="bg-white p-3 rounded text-[#1C274C] flex items-center"
        >
          <input
            type="text"
            placeholder="search....."
            className="bg-transparent focus:outline-none w-24 sm:w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          ></input>
          <button>
            <FaSearch />
          </button>
        </form>
        <ul className="flex gap-5 items-center">
          <Link to={"/"}>
            <li className="hidden sm:inline font-extrabold hover:underline cursor-pointer">
              Home
            </li>
          </Link>
          <Link to={"/about"}>
            <li className="hidden sm:inline font-extrabold hover:underline cursor-pointer">
              About
            </li>
          </Link>
          {user ? (
            <>
              <i
                onClick={onClickHandler}
                className="hidden sm:inline font-extrabold hover:underline cursor-pointer"
              >
                Logout
              </i>
              <Link to={"/profile"}>
                <img
                  className="h-10 w-10 rounded-full object-cover cursor-pointer"
                  src={user.avatar}
                  alt="profile"
                />
              </Link>
            </>
          ) : (
            <Link to={"/login"}>
              <li className="font-extrabold hover:underline cursor-pointer">
                Sign In
              </li>
            </Link>
          )}
        </ul>
      </div>
    </header>
  );
}

export default Header;
