import React, { useState, useEffect } from "react";
import Home from "./a-home";
import Logout from "./logout";

//import SidebarMenu

//import useNavigate
import { useNavigate, useParams } from "react-router-dom";

//import js cookie
import Cookies from "js-cookie";

//import api
import api from "../services/api";

//get token from cookies
const token = Cookies.get("token");

export default function UsersEdit() {
  //useNavigate
  const navigate = useNavigate();

  //destruct ID
  const { id } = useParams();

  //define state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //state validation
  const [validation, setValidation] = useState([]);

  //method fetchDetailUser
  const fetchDetailUser = async () => {
    //fetch data
    await api.get(`/api/admin/users/${id}`).then((response) => {
      //assign to state
      setName(response.data.data.name);
      setEmail(response.data.data.email);
    });
  };

  //hook useEffect
  useEffect(() => {
    //call method "fetchDetailUser"
    fetchDetailUser();
  }, []);

  //method "updateUser"
  const updateUser = async (e) => {
    e.preventDefault();

    //call api
    api.defaults.headers.common["Authorization"] = token;
    await api
      .put(`/api/admin/users/${id}`, {
        name: name,
        email: email,
        password: password,
      })
      .then(() => {
        //redirect ke halaman users
        navigate("/admin/employeedata");
      })
      .catch((error) => {
        //assign error to state validation
        setValidation(error.response.data);
      });
  };

  return (
    <>
      <div className="flex flex-row relative">
        <Home />
        <div className="absolute top-6 right-10">
          <Logout />
        </div>
        <div className="mt-32 ml-32 flex flex-col">
          <div className="text-text w-[1200px] p-10 shadow-light">
            <h1 className="font-heading text-4xl">Edit User</h1>
          </div>
          <div className="col-md-9">
            <div className="card border-0 rounded-lg shadow-lg">
              <div className="card-body p-6">
                {validation.errors && (
                  <div className="alert alert-danger mt-2 pb-0">
                    {validation.errors.map((error, index) => (
                      <p key={index} className="text-red-600">
                        {error.path} : {error.msg}
                      </p>
                    ))}
                  </div>
                )}
                <form onSubmit={updateUser}>
                  <div className="form-group mb-4">
                    <label className="mb-1 mr-2 font-semibold">Full Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="form-control border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-mainAccent"
                      placeholder="Full Name"
                    />
                  </div>

                  <div className="form-group mb-4">
                    <label className="mb-1 mr-2 font-semibold">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="form-control border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-mainAccent"
                      placeholder="Email Address"
                    />
                  </div>

                  <div className="form-group mb-4">
                    <label className="mb-1 mr-2 font-semibold">Password</label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="form-control border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-mainAccent"
                      placeholder="Password"
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-sm btn-primary bg-mainAccent text-white font-bold rounded-md p-2 hover:bg-main"
                  >
                    UPDATE
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
