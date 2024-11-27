import Login from "./components/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./style.css";
import Datakaryawan from "./components/EmployeeData";
import Dashboard from "./components/AdminDashboard";
import Ketidakhadiran from "./components/a-ketidakhadiran";
import Karyawandashboard from "./components/k-dashboard";
import Rekap from "./components/k-rekappresensi";
import Ketidakhadirankaryawan from "./components/k-ketidakhadiran";
import UsersEdit from "./components/edit";

// Import AuthProvider untuk membungkus aplikasi dengan konteks otentikasi
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      {" "}
      {/* Tambahkan AuthProvider di sini */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/datakaryawan" element={<Datakaryawan />} />
          <Route path="/ketidakhadiran" element={<Ketidakhadiran />} />
          <Route path="/employee/dashboard" element={<Karyawandashboard />} />
          <Route path="/rekap-presensi" element={<Rekap />} />
          <Route path="/ketidak-hadiran" element={<Ketidakhadirankaryawan />} />
          <Route path="/admin/users/edit/:id" element={<UsersEdit />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
