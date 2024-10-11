import React, { useEffect } from "react";

const FacebookLoginComponent = () => {
  const handleFacebookLogin = () => {
    const facebookAuthUrl = `http://localhost:3000/auth/facebook`;
    const width = 500;
    const height = 600;
    const left = (window.innerWidth - width) / 2;
    const top = (window.innerHeight - height) / 2;

    const authWindow = window.open(
      facebookAuthUrl,
      "Facebook Login",
      `width=${width},height=${height},top=${top},left=${left}`
    );
  };

  return (
    <button
      onClick={handleFacebookLogin}
      className="w-full bg-blue-400 text-white p-2 rounded"
    >
      Login with Facebook
    </button>
  );
};

export default FacebookLoginComponent;
