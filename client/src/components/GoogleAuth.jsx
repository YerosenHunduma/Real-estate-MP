// import GoogleButton from "react-google-button";
import { GoogleLoginButton } from "react-social-login-buttons";

function GoogleAuth() {
  const googleAuth = () => {
    window.open("http://localhost:5000/api/auths/google", "_self");
  };

  return (
    <div>
      <div className="flex justify-center items-center">
        <GoogleLoginButton onClick={googleAuth} />
      </div>
    </div>
  );
}

export default GoogleAuth;
