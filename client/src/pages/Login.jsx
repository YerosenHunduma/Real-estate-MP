import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LoginUser } from "../apiCalls/user";
import { useDispatch, useSelector } from "react-redux";
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../redux/user/userSlice";

function Login() {
  const [formData, setformData] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.user);

  const onchangeHandler = (e) => {
    setformData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const response = await LoginUser(formData);
      console.log(response);
      if (response.success === false) {
        dispatch(signInFailure(response.message));
        return;
      }
      dispatch(signInSuccess(response.userinfo));
      navigate("/");
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className="p-10 mt-10 max-w-md mx-auto bg-slate-200 rounded-lg ">
      <h1 className="text-3xl text-center font-bold uppercase mb-3">Login</h1>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={onSubmitHandler} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="email"
          id="email"
          className="border p-2 rounded-md"
          onChange={onchangeHandler}
        />
        <input
          type="text"
          placeholder="password"
          id="password"
          className="border p-2 rounded-md"
          onChange={onchangeHandler}
        />
        <button
          disabled={loading}
          className="bg-[#232830] text-white uppercase rounded-lg p-3 hover:opacity-80 disabled:opacity-60"
        >
          {loading ? "loading..." : "Login"}
        </button>
        <div className="flex gap-2">
          <p>Do not Have an account?</p>
          <Link to={"/signup"}>
            <span className="text-[#06bfe2] hover:underline">SignUp</span>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
