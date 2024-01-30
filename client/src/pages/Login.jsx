import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LoginUser } from "../apiCalls/user";

function Login() {
  const [formData, setformData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onchangeHandler = (e) => {
    setformData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      console.log(formData);
      const response = await LoginUser(formData);
      console.log(response);
      if (response.success === false) {
        setLoading(false);
        setError(response.message);
        return;
      }
      setLoading(false);
      setError(null);
      navigate("/");
    } catch (error) {
      setLoading(false);
      setError(error.message);
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
