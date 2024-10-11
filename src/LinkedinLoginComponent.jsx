import React, { useEffect } from "react";

const LinkedinLoginComponent = () => {
  const handleLinkedInLogin = () => {
    const linkedinAuthUrl = `http://localhost:3000/auth/linkedin`;
    const width = 500;
    const height = 600;
    const left = (window.innerWidth - width) / 2;
    const top = (window.innerHeight - height) / 2;

    const authWindow = window.open(
      linkedinAuthUrl,
      "LinkedIn Login",
      `width=${width},height=${height},top=${top},left=${left}`
    );
    console.log("authWindow", authWindow);
  };

  return (
    <button
      onClick={handleLinkedInLogin}
      className="w-full bg-blue-700 text-white p-2 rounded"
    >
      Login with Linkedin
    </button>
  );
};

export default LinkedinLoginComponent;
