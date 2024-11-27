import { useState, useEffect, React } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "./Button";

export default function Home() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="border-border flex flex-col border-4 ml-4 bg-main w-[20%] h-[900px] mt-7 justify-between shadow-light">
      <div className="pt-16 flex justify-center flex-col">
        <Button
          onClick={() => handleNavigate("/employee/dashboard")}
          className={`mb-10 text-center rounded-base shadow-light border font-extrabold text-2xl ml-10 border-border w-60 p-4 ${
            isActive("/employee/dashboard")
              ? "bg-mainAccent"
              : "bg-bg text-text"
          }`}
        >
          Beranda
        </Button>
        <Button
          onClick={() => handleNavigate("/rekap-presensi")}
          className={`mb-10 text-center rounded-base shadow-light border font-extrabold text-2xl border-border ml-10 p-4 w-60 ${
            isActive("/rekap-presensi") ? "bg-mainAccent" : "bg-bg text-text"
          }`}
        >
          Rekap Presensi
        </Button>
        <Button
          onClick={() => handleNavigate("/ketidak-hadiran")}
          className={`mb-10 text-center rounded-base shadow-light border font-extrabold text-2xl border-border ml-10 p-4 w-60 ${
            isActive("/ketidak-hadiran") ? "bg-mainAccent" : "bg-bg text-text"
          }`}
        >
          Ketidak Hadiran
        </Button>
      </div>
      <div className="flex text-lg ml-20 mb-10 cursor-pointer">
        <img src="user.png" alt="" width="25" className="mr-2" />
      </div>
    </div>
  );
}
