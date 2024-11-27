//import hook react
import React, { useState, useContext } from "react";

//import Button dari komponen yang sudah ada
import Button from "./Button";

//import hook useNavigate dari react router dom
import { useNavigate } from "react-router-dom";

//import services api
import api from "../services/api";

//import js-cookie
import Cookies from "js-cookie";

//import context
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  //navigate
  const navigate = useNavigate();

  //destructure context "setIsAuthenticated"
  const { setIsAuthenticated } = useContext(AuthContext);

  //define state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("employee"); // Menambahkan state untuk role
  const [validation, setValidation] = useState([]);
  const [loginFailed, setLoginFailed] = useState([]);

  //function "login"
  const handleLogin = async (e) => {
    e.preventDefault();

    //call api login
    await api
      .post("/api/login", {
        email: email,
        password: password,
        role: role, // Menyertakan role dalam permintaan login
      })
      .then((response) => {
        //set token and user to cookie
        Cookies.set("token", response.data.data.token);
        Cookies.set("user", JSON.stringify(response.data.data.user));

        //assign true to state "isAuthenticated"
        setIsAuthenticated(true);

        //redirect ke halaman dashboard
        if (role == "admin") {
          navigate("/admin/dashboard", { replace: true });
        } else if (role == "employee") {
          navigate("employee/dashboard");
        }
      })
      .catch((error) => {
        //assign error to state "validation"
        setValidation(error.response.data);

        //assign error to state "loginFailed"
        setLoginFailed(error.response.data);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg text-text p-6">
      <div className="w-full max-w-md bg-main p-8 rounded-base shadow-light border border-border">
        <h2 className="text-2xl font-heading mb-4">Login</h2>
        <div className="flex mb-5 justify-center space-x-8">
          <Button
            onClick={() => {
              setRole("employee");
            }}
            className={`px-7 py-3 ${
              role === "employee"
                ? "text-white bg-mainAccent px-10 py-6 font-bold"
                : ""
            }`}
          >
            Employee
          </Button>
          <Button
            onClick={() => {
              setRole("admin");
            }}
            className={`px-7 py-3 ${
              role === "admin"
                ? "text-white bg-mainAccent px-10 py-6 font-bold"
                : ""
            }`}
          >
            Admin
          </Button>
        </div>

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block font-base mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-base border border-border shadow-light focus:outline-none focus:ring-2 focus:ring-mainAccent"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-6">
            <label className="block font-base mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-base border border-border shadow-light focus:outline-none focus:ring-2 focus:ring-mainAccent"
              placeholder="Enter your password"
            />
          </div>
          <div className="text-red-600">
            {validation.errors && (
              <div className="alert alert-danger mt-2 pb-0">
                {validation.errors.map((error, index) => (
                  <p key={index}>
                    {error.path} : {error.msg}
                  </p>
                ))}
              </div>
            )}
            {loginFailed.message && (
              <div className="alert alert-danger mt-2">
                {loginFailed.message}
              </div>
            )}
          </div>
          <Button
            type="submit"
            className="w-full p-3 text-xl font-heading text-white bg-mainAccent shadow-light border border-border rounded-base hover:translate-x-boxShadowX hover:translate-y-boxShadowY transition-transform flex justify-center"
          >
            Login
          </Button>
        </form>
      </div>
    </div>
  );
}
