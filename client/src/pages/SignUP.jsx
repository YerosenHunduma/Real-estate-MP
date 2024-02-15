import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RegisterUser } from "../apiCalls/user";

function SignUP() {
  const [formData, setformData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState(null);
  const navigate = useNavigate();
  const onchangeHandler = (e) => {
    setformData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  console.log(formData);
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      console.log(formData);
      const response = await RegisterUser(formData);
      console.log("ressss", response);

      if (response.success === false) {
        setLoading(false);
        setError(response.message);
        return;
      }
      setLoading(false);
      setError(null);
      setSuccessMsg(response.message);
      navigate("/login");
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };
  console.log(successMsg);
  return (
    <div className="p-10 mt-10 max-w-md mx-auto bg-slate-200 rounded-lg ">
      <h1 className="text-3xl text-center font-bold uppercase mb-3">SignUP</h1>
      {error && <p className="text-red-500">{error}</p>}
      {successMsg && <p className="text-green-500">{successMsg}</p>}
      {console.log(successMsg)}
      <form onSubmit={onSubmitHandler} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="username"
          id="username"
          className="border p-2 rounded-md"
          onChange={onchangeHandler}
        />
        <input
          type="text"
          placeholder="email"
          id="email"
          className="border p-2 rounded-md"
          onChange={onchangeHandler}
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          className="border p-2 rounded-md"
          onChange={onchangeHandler}
        />
        <input
          type="password"
          placeholder="Confirm password"
          id="Cpassword"
          className="border p-2 rounded-md"
          onChange={onchangeHandler}
        />
        <button
          disabled={loading}
          className="bg-[#232830] text-white uppercase rounded-lg p-3 hover:opacity-80 disabled:opacity-60"
        >
          {loading ? "loading..." : "SignUp"}
        </button>
        <div className="flex gap-2">
          <p>Have an account?</p>
          <Link to={"/login"}>
            <span className="text-[#06bfe2] hover:underline">Login</span>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default SignUP;
