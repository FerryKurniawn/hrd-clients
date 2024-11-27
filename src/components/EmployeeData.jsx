import React, { useState, useEffect } from "react";
import Home from "./a-home";
import Logout from "./logout";

//import Link
import { Link } from "react-router-dom";

//import js cookie
import Cookies from "js-cookie";

//import api
import api from "../services/api";

export default function EmployeeData() {
  const [users, setUsers] = useState([]);

  //define method "fetchDataUsers"
  const fetchDataUsers = async () => {
    //get token from cookies inside the function to ensure it's up-to-date
    const token = Cookies.get("token");

    if (token) {
      //set authorization header with token
      api.defaults.headers.common["Authorization"] = token;

      //fetch data from API with Axios
      try {
        const response = await api.get("/api/admin/users");
        //assign response data to state "users"
        setUsers(response.data.data);
      } catch (error) {
        console.error("There was an error fetching the users!", error);
      }
    } else {
      console.error("Token is not available!");
    }
  };

  //run hook useEffect
  useEffect(() => {
    //call method "fetchDataUsers"
    fetchDataUsers();
  }, []);

  //define method "deleteUser"
  const deleteUser = async (id) => {
    //get token from cookies inside the function to ensure it's up-to-date
    const token = Cookies.get("token");

    if (token) {
      //set authorization header with token
      api.defaults.headers.common["Authorization"] = token;

      try {
        //fetch data from API with Axios
        await api.delete(`/api/admin/users/${id}`);

        //call method "fetchDataUsers"
        fetchDataUsers();
      } catch (error) {
        console.error("There was an error deleting the user!", error);
      }
    } else {
      console.error("Token is not available!");
    }
  };
  return (
    <>
      <div className="flex flex-row relative">
        <Home />
        <div className="absolute top-6 right-10">
          <Logout />
        </div>
        <div className="mt-32 ml-32 flex flex-col">
          <div className="text-text w-[1200px] p-10shadow-light">
            <h1 className="font-heading text-4xl ">Employee Data</h1>
          </div>
          <div className="card-body mt-5">
            <table className="min-w-full border border-border rounded-lg shadow-light">
              <thead className="bg-main text-white">
                <tr>
                  <th
                    scope="col"
                    className="p-4 border-b border-border text-left"
                  >
                    Full Name
                  </th>
                  <th
                    scope="col"
                    className="p-4 border-b border-border text-left"
                  >
                    Email Address
                  </th>
                  <th
                    scope="col"
                    className="p-4 border-b border-border text-left"
                    style={{ width: "17%" }}
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.length > 0 ? (
                  users.map((user, index) => (
                    <tr
                      key={index}
                      className="hover:bg-gray-200 transition duration-200"
                    >
                      <td className="p-4 border-b border-border">
                        {user.name}
                      </td>
                      <td className="p-4 border-b border-border">
                        {user.email}
                      </td>
                      <td className="flex flex-row space-x-5 text-center p-4 border-b border-border">
                        <Link
                          to={`/admin/users/edit/${user.id}`}
                          className="text-main font-bold hover:underline"
                        >
                          EDIT
                        </Link>
                        <button
                          onClick={() => deleteUser(user.id)}
                          className="text-red-600 font-bold hover:underline"
                        >
                          DELETE
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="3"
                      className="text-center p-4 border-b border-border"
                    >
                      <div className="text-gray-500">Data Belum Tersedia!</div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
