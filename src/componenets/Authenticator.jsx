import React, { useState, useEffect } from "react";
import Background from "./Background";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Authenticator = ({ onAuthenticated }) => {
  const [masterPassword, setMasterPassword] = useState("");
  const [step, setStep] = useState("loading");
  const [input, setInput] = useState("");

  // CHECK IF MASTER PASSWORD EXISTS
  useEffect(() => {
    const savedPassword = localStorage.getItem("masterPassword");

    if (savedPassword) {
      setStep("login");  // Show login page
    } else {
      setStep("create"); // Ask user to create password first
    }
  }, []);

  // CREATE MASTER PASSWORD
  const handleCreate = () => {
    if (masterPassword.trim().length < 4) {
      alert("Password must be at least 4 characters long.");
      return;
    }

    localStorage.setItem("masterPassword", masterPassword);
    alert("Master password created successfully!");
    setStep("login"); // Now ask user to login
  };

  // LOGIN MASTER PASSWORD
  const handleLogin = () => {
    const savedPassword = localStorage.getItem("masterPassword");

    if (input === savedPassword) {
      onAuthenticated(true); // Continue to app
    } else {
      alert("Incorrect password!");
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col">

      {/* NAVBAR */}
      <Navbar />

      {/* BACKGROUND */}
      <div className="absolute inset-0 -z-10">
        <Background />
      </div>

      {/* MAIN AUTH */}
      <div className="flex-1 flex flex-col items-center justify-center px-6">

        {/* WELCOME */}
        <h1 className="text-4xl font-bold text-teal-900 mb-2">Welcome To</h1>

        <h1 className="text-5xl font-bold mb-6">
          <span className="text-teal-900">&lt;</span>
          Pass
          <span className="text-teal-900">OP/&gt;</span>
        </h1>

        <p className="text-teal-900 text-lg mb-8">
          Your own password manager
        </p>

        {/* ============================
           STEP 1 → CREATE PASSWORD
        ============================ */}
        {step === "create" && (
          <>
            <h2 className="text-2xl font-semibold mb-4">Set Master Password</h2>

            <input
              type="password"
              placeholder="Enter new password"
              className="rounded-full border border-teal-600 w-full max-w-sm p-3"
              value={masterPassword}
              onChange={(e) => setMasterPassword(e.target.value)}
            />

            <button
              onClick={handleCreate}
              className="mt-4 bg-teal-200 text-white py-2 px-6 rounded-full hover:bg-teal-400 w-full max-w-sm"
            >
              Set Password
            </button>
          </>
        )}

        {/* ============================
           STEP 2 → LOGIN
        ============================ */}
        {step === "login" && (
          <>
            <h2 className="text-2xl font-semibold mb-4">Enter Master Password</h2>

            <input
              type="password"
              placeholder="Enter password"
              className="rounded-full border border-teal-600 w-full max-w-sm p-3"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />

            <button
              onClick={handleLogin}
              className="mt-4 bg-teal-200 text-white py-2 px-6 rounded-full hover:bg-teal-400 w-full max-w-sm"
            >
              Login
            </button>

            <button
              className="mt-4 underline text-sm text-red-600"
              onClick={() => {
                localStorage.removeItem("masterPassword");
                setMasterPassword("");
                setInput("");
                setStep("create");
              }}
            >
              Forgot master password? Reset
            </button>
          </>
        )}
      </div>

      {/* FOOTER */}
      <Footer />
    </div>
  );
};

export default Authenticator;
