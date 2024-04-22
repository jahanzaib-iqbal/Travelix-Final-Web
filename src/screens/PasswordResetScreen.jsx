import React, { useState } from "react";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useDispatch, useSelector } from "react-redux";
import { forgetpasswordSelector } from "../features/auth/forgetPasswordSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { loginSelector } from "../features/auth/loginSlice";
function PasswordResetScreen() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);
  const { email } = useSelector(forgetpasswordSelector);
  const navigate = useNavigate();
  console.log("Email in reset Screen is" + email);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log("Sending form");
    console.log(email);

    if (password !== confirmPassword) {
      setError("Passwords did not match");
      return;
    }
    console.log("Sending request to:");
    setLoading(true);
    try {
      const response = await axios.post(
        "https://travelix-backend-v2.vercel.app/api/auth/reset-password",
        {
          email,
          resetCode: code,
          newPassword: password,
        }
      );

      if (response.status === 200) {
        setMessage(response.data);
      } else {
        setError(response.data);
      }

      navigate("/login");
    } catch (error) {
      const errorMessage =
        error.response && error.response.data
          ? error.response.data
          : error.message;
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main id="content" role="main" className="w-full max-w-md mx-auto p-6">
      {loading && <Loader />}
      {error && <Message>{error}</Message>}
      {message && <Message color="info">{message}</Message>}
      {error && <Message>{error}</Message>}
      <div className="mt-7 bg-white rounded-xl shadow-lg dark:bg-gray-800 dark:border-gray-700 border-2 border-indigo-300">
        <div className="p-4 sm:p-7">
          <div className="mt-5">
            <form onSubmit={handleFormSubmit}>
              <div className="grid gap-y-4">
                <div>
                  <label
                    htmlFor="code"
                    className="block text-sm font-bold ml-1 mb-2 dark:text-white"
                  >
                    Code
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="code"
                      name="code"
                      className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                      required
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-bold ml-1 mb-2 dark:text-white"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      id="password"
                      name="password"
                      className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-bold ml-1 mb-2 dark:text-white"
                  >
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
                >
                  Reset password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

  
    </main>
  );
}

export default PasswordResetScreen;
