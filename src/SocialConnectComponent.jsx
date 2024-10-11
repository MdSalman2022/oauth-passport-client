import React, { useEffect } from "react";
import GoogleLoginComponent from "./GoogleLoginComponent";
import LinkedinLoginComponent from "./LinkedinLoginComponent";
import FacebookLoginComponent from "./FacebookLoginComponent";
import TwitterLoginComponent from "./TwitterLoginComponent";

const SocialConnectComponent = () => {
  useEffect(() => {
    const handleMessage = (event) => {
      if (event.origin !== "http://localhost:3000") return; // Ensure the message is from your backend
      const { token } = event.data;
      if (token) {
        window.location.href = `http://localhost:5173?token=${token}`;
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  return (
    <div className="flex flex-col gap-2">
      <GoogleLoginComponent />
      <LinkedinLoginComponent />
      <FacebookLoginComponent />
      <TwitterLoginComponent />
    </div>
  );
};

export default SocialConnectComponent;
