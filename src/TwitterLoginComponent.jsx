import React, { useEffect } from "react";

const TwitterLoginComponent = () => {
  const handleTwitterLogin = () => {
    const twitterAuthUrl = `http://localhost:3000/auth/twitter`;
    const width = 500;
    const height = 600;
    const left = (window.innerWidth - width) / 2;
    const top = (window.innerHeight - height) / 2;

    const authWindow = window.open(
      twitterAuthUrl,
      "Twitter Login",
      `width=${width},height=${height},top=${top},left=${left}`
    );
  };

  return (
    <button
      onClick={handleTwitterLogin}
      className="w-full bg-blue-400 text-white p-2 rounded"
    >
      Login with Twitter
    </button>
  );
};

export default TwitterLoginComponent;
