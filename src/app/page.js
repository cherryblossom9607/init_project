"use client";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

import { useState } from "react";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("email", email);
      console.log("password", password);
    } catch (error) {
      console.log("error", error);
    }
  };
  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="bg-black/90 min-h-dvh text-white flex justify-center items-center ">
      <form
        onSubmit={handleSubmit}
        className="w-350 max-w-[400px] h-70 m-4 bg-gradient-to-b from-gray-500/50 to-indigo-500/50 rounded-2xl p-4"
      >
        <div className="mt-4">
          <label>Email</label>
          <input
            type="text"
            id="email"
            name="email"
            autoComplete="off"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div>
          <label>Password</label>
          <div className="input-group">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={password}
              autoComplete="off"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <button
              type="button"
              className="border-l border-l-white hover:bg-white hover:text-gray-800 hover:border-none"
              onClick={handleTogglePassword}
            >
              {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
            </button>
          </div>
        </div>
        <button
          type="submit"
          className="border border-white p-2 mt-4 rounded w-full hover:bg-white/50 hover:border-none cursor-pointer "
        >
          Sign in
        </button>
      </form>
    </div>
  );
}
