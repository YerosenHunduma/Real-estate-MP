import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteList,
  deleteUser,
  getUserList,
  updateUser,
} from "../apiCalls/user";
import {
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
} from "../redux/user/userSlice";
import { Link } from "react-router-dom";

function Profile() {
  const [formData, setFormData] = useState({});
  const { user } = useSelector((state) => state.user);
  const [listError, setlistError] = useState(true);
  const [list, setList] = useState([]);
  const dispatch = useDispatch();

  const onclickHandler = async (e) => {
    console.log(e);
    try {
      dispatch(deleteUserStart());

      const response = await deleteUser(user._id);

      if (response.success === false) {
        dispatch(deleteUserFailure(response.message));
        return;
      }
      dispatch(deleteUserSuccess());
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };
  const onchangeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      console.log(user);
      console.log("h", formData);
      const response = await updateUser(user._id, formData);
      console.log("res", response);
      if (response.success === false) {
        dispatch(updateUserFailure(response.message));
        return;
      }
      console.log("first", response);
      dispatch(updateUserSuccess(response.rest));
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };
  const listOnclickHandler = async (e) => {
    try {
      setlistError(false);
      const response = await getUserList(user._id);

      setList(response.listings);
      if (response.success === false) {
        setlistError(true);
        return;
      }
    } catch (error) {
      setlistError(true);
    }
  };

  const deleteOnclickHandler = async (list_id) => {
    console.log(list_id);
    try {
      const response = await deleteList(list_id);
      console.log(response);
      if (response.success === false) {
        console.log(response.message);
        return;
      }
      setList((prev) => prev.filter((listing) => listing.id !== list_id));
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="my-7 text-3xl font-semibold text-center">Profile</h1>
      <form className="flex flex-col gap-4" onSubmit={onSubmitHandler}>
        <img
          src={user.avatar}
          alt="profile"
          className="h-20 w-20 self-center rounded-full object-cover cursor-pointer"
        />
        <input
          type="text"
          placeholder="username"
          id="username"
          defaultValue={user.username}
          className="p-3 border rounded-lg"
          onChange={onchangeHandler}
        />
        <input
          type="text"
          placeholder="email"
          id="email"
          defaultValue={user.email}
          className="p-3 border rounded-lg"
          onChange={onchangeHandler}
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          className="p-3 border rounded-lg"
          onChange={onchangeHandler}
        />
        <button className="bg-blue-800 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded">
          Update
        </button>
        <Link
          to={"/createlisting"}
          className="bg-green-800 hover:bg-green-500 text-white font-bold py-2 px-4 rounded text-center"
        >
          Create Listing
        </Link>
      </form>
      <div>
        <button
          onClick={onclickHandler}
          className="bg-red-500 text-white hover:bg-red-400 cursor-pointer my-2 rounded-lg p-2"
        >
          Delete account
        </button>
      </div>
      <button
        onClick={listOnclickHandler}
        className="bg-green-500 text-white hover:bg-green-400 cursor-pointer my-2 rounded-lg p-2"
      >
        Show Listing
      </button>
      {listError && <p className="text-red-500">{listError}</p>}
      {list && list.length > 0 && (
        <div className="flex flex-col">
          <h1 className="text-center text-3xl mt-7">Your Listings</h1>
          {list.map((listing) => (
            <div className="border rounded-lg p-3 flex justify-between items-center gap-5">
              <Link to={`/list/${list._id}`}>
                <div key={listing._id} className="">
                  <img
                    src={listing.imageUrls}
                    alt="image"
                    className="h-16 w-16 object-cover"
                  />
                </div>
              </Link>
              <Link
                to={`/list/${list._id}`}
                className="flex-1 font-semibold hover:underline"
              >
                <p key={listing._id} className="">
                  {listing.name}
                </p>
              </Link>
              <div className="flex flex-col items-center">
                <button
                  className="text-red-700"
                  onClick={() => {
                    console.log(list._id);
                    deleteOnclickHandler(listing._id);
                  }}
                >
                  Delete
                </button>
                <Link to={`/update-list/${listing._id}`}>
                  <button className="text-green-700">Edit</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Profile;
