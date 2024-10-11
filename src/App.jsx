import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { jwtDecode as jwt_decode } from "jwt-decode";
import "./App.css";
import GoogleLoginComponent from "./GoogleLoginComponent";
import SocialConnectComponent from "./SocialConnectComponent";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    // Check if the user is already logged in by checking the session cookie
    const token = Cookies.get("session");
    console.log("token", token);
    if (token) {
      const decoded = jwt_decode(token); // Decode the token to extract user information
      console.log("decoded", decoded);
      setUsername(decoded.username); // Set the username in the state
      setIsLoggedIn(true);
    }

    // Check if there is a token in the URL (for Google login)
    const urlParams = new URLSearchParams(window.location.search);
    const googleToken = urlParams.get("token");
    console.log("googleToken", googleToken);
    if (googleToken) {
      const decoded = jwt_decode(googleToken); // Decode the token to extract user information
      console.log("decoded", decoded);
      setUsername(decoded.username); // Set the username in the state
      setIsLoggedIn(true);
      Cookies.set("session", googleToken); // Set a session cookie
      window.history.replaceState({}, document.title, "/"); // Remove the token from the URL
    }
  }, []);
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      setMessage(
        data.success ? "User created successfully" : "Registration failed"
      );
    } catch (error) {
      setMessage("Registration failed");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
        credentials: "include", // Include credentials (cookies) in the request
      });
      const data = await response.json();
      if (data.success) {
        const decoded = jwt_decode(data.token); // Decode the token to extract user information
        setUsername(decoded.username); // Set the username in the state
        setIsLoggedIn(true);
        setMessage("");
        Cookies.set("session", data.token); // Set a session cookie
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage("Login failed");
    }
  };

  /*   const handleGoogleLogin = () => {
    window.location.href = "http://localhost:3000/auth/google";
  }; */

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:3000/auth/logout", {
        method: "POST",
        credentials: "include", // Include credentials (cookies) in the request
      });
      const data = await response.json();
      if (data.success) {
        setIsLoggedIn(false);
        setUsername("");
        setPassword("");
        setMessage(data.message);
        Cookies.remove("session"); // Remove the session cookie
      } else {
        setMessage("Logout failed");
      }
    } catch (error) {
      setMessage("Logout failed");
    }
  };

  if (isLoggedIn) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-4xl font-bold mb-8">Home Page</h1>
        <p className="text-2xl mb-4">Welcome, {username}!</p>
        <button
          onClick={handleLogout}
          className="w-full bg-red-500 text-white p-2 rounded"
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5 items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">
        Authentication with Passport.js
      </h1>
      <SocialConnectComponent />
      {/* <button onClick={handleGoogleLogin}>Login with Google</button> */}
      <form
        onSubmit={handleRegister}
        className="bg-white p-6 rounded shadow-md w-full max-w-sm mb-6"
      >
        <h2 className="text-2xl font-semibold mb-4">Register</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          Register
        </button>
      </form>

      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          Login
        </button>
      </form>

      {message && <p className="mt-4 text-red-500">{message}</p>}
    </div>
  );
}

export default App;
