import React, { useState, useEffect } from "react";
import Home from "./a-home";
import Logout from "./logout";
import Button from "./Button";

export default function InitialData() {
  const [employees, setEmployees] = useState(() => {
    const savedEmployees = localStorage.getItem("employees");
    return savedEmployees ? JSON.parse(savedEmployees) : initialEmployees;
  });

  const [formData, setFormData] = useState({
    id: "",
    name: "",
    position: "",
    salary: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const updateLocalStorage = (newEmployees) => {
    setEmployees(newEmployees);
    localStorage.setItem("employees", JSON.stringify(newEmployees));
    localStorage.setItem("totalEmployee", newEmployees.length);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddEmployee = () => {
    const newId =
      employees.length > 0 ? employees[employees.length - 1].id + 1 : 1;
    const newEmployeeData = {
      ...formData,
      id: newId,
      salary: parseFloat(formData.salary),
    };
    const updatedEmployees = [...employees, newEmployeeData];
    updateLocalStorage(updatedEmployees);

    setFormData({ id: "", name: "", position: "", salary: "" });
    setShowForm(false);
  };

  return (
    <>
      <div className="flex flex-row">
        <Home />
        <div className="absolute top-6 right-10">
          <Logout />
        </div>
        <div className="mt-32 ml-32 flex flex-col">
          <div>
            <h1 className="font-heading text-3xl mb-10">Data Karyawan</h1>
            <div className="flex flex-row mb-4">
              <input
                type="text"
                name="name"
                placeholder="Nama"
                className="border-2 border-darkBorder p-2 rounded-lg mb-2"
              />
              <input
                type="text"
                name="position"
                placeholder="Jabatan"
                className="border-2 border-darkBorder p-2 rounded-lg mb-2"
              />
              <input
                type="number"
                name="salary"
                placeholder="Gaji"
                className="border-2 border-darkBorder p-2 rounded-lg mb-2"
              />
              {isEditing ? (
                <Button className="bg-green-500 text-white border-2 border-transparent rounded-lg px-2 ml-3">
                  Simpan Perubahan
                </Button>
              ) : (
                <Button className="bg-green-600 text-white border-2 border-transparent rounded-lg px-2 ml-3">
                  Tambah Karyawan
                </Button>
              )}
            </div>
          </div>
          <div className="pt-10">
            <table className="min-w-full border-2 border-darkBorder rounded-lg shadow-lg bg-white">
              <thead>
                <tr className="bg-mainAccent text-darkText font-heading">
                  <th className="border-2 border-darkBorder p-4">ID</th>
                  <th className="border-2 border-darkBorder p-4">Nama</th>
                  <th className="border-2 border-darkBorder p-4">Jabatan</th>
                  <th className="border-2 border-darkBorder p-4">Gaji</th>
                  <th className="border-2 border-darkBorder p-4">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((employee) => (
                  <tr
                    key={employee.id}
                    className="hover:bg-gray-100 transition-all"
                  >
                    <td className="border-2 border-darkBorder text-center p-4">
                      {employee.id}
                    </td>
                    <td className="border-2 border-darkBorder text-center p-4">
                      {employee.name}
                    </td>
                    <td className="border-2 border-darkBorder text-center p-4">
                      {employee.position}
                    </td>
                    <td className="border-2 border-darkBorder text-center p-4">
                      Rp. {employee.salary.toLocaleString()}
                    </td>
                    <td className="flex flex-row border-2 border-darkBorder text-center p-4">
                      <Button
                        onClick={() => handleEdit(employee)}
                        className="bg-blue-500 text-white border-2 border-transparent rounded-lg p-2 mr-2"
                      >
                        Edit
                      </Button>
                      <Button
                        onClick={() => handleDelete(employee.id)}
                        className="bg-red-500 text-white border-2 border-transparent rounded-lg p-2"
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
