import React, { useState, useEffect } from "react";
import Home from "./k-home";
import Logout from "./logout";

export default function Karyawandashboard() {
  const username = localStorage.getItem("employee_username");
  const [showButtonMasuk, setShowButtonMasuk] = useState(true);
  const [showButtonKeluar, setShowButtonKeluar] = useState(false);
  const [timeMasuk, setTimeMasuk] = useState("");
  const [timeKeluar, setTimeKeluar] = useState("");
  const [isPresensiCompleted, setIsPresensiCompleted] = useState(false);

  useEffect(() => {
    const presensiStatus = localStorage.getItem(`${username}_presensi`);
    const storedTimeMasuk = localStorage.getItem(`${username}_timeMasuk`);
    const storedTimeKeluar = localStorage.getItem(`${username}_timeKeluar`);

    if (presensiStatus === "completed") {
      setShowButtonMasuk(false);
      setShowButtonKeluar(false);
      setTimeMasuk(storedTimeMasuk);
      setTimeKeluar(storedTimeKeluar);
      setIsPresensiCompleted(true);
    } else if (storedTimeMasuk) {
      setShowButtonMasuk(false);
      setShowButtonKeluar(true);
      setTimeMasuk(storedTimeMasuk);
    }
  }, [username]);

  useEffect(() => {
    const id = setInterval(() => {
      const currentTime = new Date()
        .toLocaleTimeString("ID", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hourCycle: "h23",
        })
        .replace(/\./g, ":");

      if (showButtonKeluar) {
        setTimeKeluar(currentTime);
      } else if (showButtonMasuk) {
        setTimeMasuk(currentTime);
      }
    }, 1000);

    return () => clearInterval(id);
  }, [showButtonMasuk, showButtonKeluar]);

  const handleMasuk = () => {
    const currentTime = new Date()
      .toLocaleTimeString("ID", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hourCycle: "h23",
      })
      .replace(/\./g, ":");

    setTimeMasuk(currentTime);
    setShowButtonMasuk(false);
    setShowButtonKeluar(true);
    localStorage.setItem(`${username}_timeMasuk`, currentTime);
    localStorage.setItem(`${username}_presensi`, "ongoing");
  };

  const handleKeluar = () => {
    const currentTime = new Date()
      .toLocaleTimeString("ID", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hourCycle: "h23",
      })
      .replace(/\./g, ":");

    localStorage.setItem(`${username}_timeKeluar`, currentTime);
    localStorage.setItem(`${username}_presensi`, "completed");
    setShowButtonKeluar(false);
    setIsPresensiCompleted(true);
  };

  return (
    <>
      <div className="flex flex-row">
        <Home />
        <div className="absolute top-6 right-10">
          <Logout />
        </div>
        <div className="mt-32 ml-32 flex flex-col">
          <h1 className="font-bold text-3xl">Home</h1>
          <div className="flex flex-row mt-20 w-[1200px] justify-center">
            <div className="bg-[#22C55E] w-80 mr-20 h-64 p-4 rounded-lg flex flex-col items-center justify-center border-border border-4 shadow-light">
              <h1 className="font-bold text-white mb-2 text-xl">
                Presensi Masuk
              </h1>
              <p className="text-white mb-3">{timeMasuk}</p>
              {showButtonMasuk && (
                <button
                  onClick={handleMasuk}
                  className="flex text-text cursor-pointer items-center rounded-base border-2 border-border dark:border-darkBorder bg-main px-4 py-2 text-sm font-base shadow-light dark:shadow-dark transition-all hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none dark:hover:shadow-none"
                >
                  Masuk
                </button>
              )}
            </div>
            <div className="bg-[#A855F7] w-80 h-64 p-4 rounded-lg flex flex-col items-center justify-center border-border border-4 shadow-light">
              <h1 className="font-bold text-white mb-2 text-xl">
                Presensi Keluar
              </h1>
              {isPresensiCompleted ? (
                ""
              ) : (
                <p className="text-white mb-3"> {timeKeluar}</p>
              )}
              {showButtonKeluar ? (
                <button
                  onClick={handleKeluar}
                  className="flex text-text cursor-pointer items-center rounded-base border-2 border-border dark:border-darkBorder bg-main px-4 py-2 text-sm font-base shadow-light dark:shadow-dark transition-all hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none dark:hover:shadow-none"
                >
                  Keluar
                </button>
              ) : isPresensiCompleted ? (
                <p className="text-white font-base text-center">
                  Kamu telah berhasil presensi pada {timeKeluar}
                </p>
              ) : (
                <p className="text-white font-base text-center">
                  Lakukan presensi masuk terlebih dahulu
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
