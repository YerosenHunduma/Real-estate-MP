import React from "react";
import { FacebookLoginButton } from "react-social-login-buttons";

function FacebookAuth() {
  const facebookLogin = () => {
    window.open("http://localhost:5000/api/auths/auth/facebook", "_self");
  };
  return (
    <div>
      <div className="flex justify-center items-center">
        <FacebookLoginButton onClick={facebookLogin} />
      </div>
    </div>
  );
}

export default FacebookAuth;
