import React, { useEffect } from "react";

const GoogleLoginComponent = () => {
  const handleGoogleLogin = () => {
    const googleAuthUrl = `http://localhost:3000/auth/google`;
    const width = 500;
    const height = 600;
    const left = (window.innerWidth - width) / 2;
    const top = (window.innerHeight - height) / 2;

    const authWindow = window.open(
      googleAuthUrl,
      "Google Login",
      `width=${width},height=${height},top=${top},left=${left}`
    );
    console.log("authWindow", authWindow);
  };

  return (
    <button
      onClick={handleGoogleLogin}
      className="w-full bg-blue-500 text-white p-2 rounded"
    >
      Login with Google
    </button>
  );
};

export default GoogleLoginComponent;
