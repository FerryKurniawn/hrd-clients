import React from "react";
import Home from "./k-home";
import Logout from "./logout";

export default function Rekappresensi() {
  const username = localStorage.getItem("employee_username");
  const timeMasuk = localStorage.getItem(`${username}_timeMasuk`);
  const timeKeluar = localStorage.getItem(`${username}_timeKeluar`);
  const presensiStatus = localStorage.getItem(`${username}_presensi`);

  const calculateTotalHours = (timeIn, timeOut) => {
    if (!timeIn || !timeOut) return "0 jam 0 menit 0 detik";

    const [inHours, inMinutes, inSeconds] = timeIn.split(":").map(Number);
    const [outHours, outMinutes, outSeconds] = timeOut.split(":").map(Number);

    const totalInSeconds = inHours * 3600 + inMinutes * 60 + inSeconds;
    const totalOutSeconds = outHours * 3600 + outMinutes * 60 + outSeconds;
    const totalSeconds = totalOutSeconds - totalInSeconds;

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${hours} jam ${minutes} menit ${seconds} detik`;
  };

  const totalHours = calculateTotalHours(timeMasuk, timeKeluar);
  const currentDate = new Date().toLocaleDateString("ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <>
      <div className="flex flex-row">
        <Home />
        <div className="absolute top-6 right-10">
          <Logout />
        </div>
        <div className="mt-32 ml-32 flex flex-col">
          <h1 className="font-heading text-3xl mb-10">Rekap Presensi</h1>
          <table className="min-w-full border border-gray-300">
            <thead>
              <tr className="bg-main">
                <th className="border border-gray-300 px-4 py-2">Nama</th>
                <th className="border border-gray-300 px-4 py-2">Tanggal</th>
                <th className="border border-gray-300 px-4 py-2">Jam Masuk</th>
                <th className="border border-gray-300 px-4 py-2">Jam Keluar</th>
                <th className="border border-gray-300 px-4 py-2">
                  Total Jam Kerja
                </th>
              </tr>
            </thead>
            <tbody>
              {presensiStatus === "completed" ? (
                <tr>
                  <td className="border border-gray-300 px-4 py-2">
                    {username}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {currentDate}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {timeMasuk}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {timeKeluar}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {totalHours}
                  </td>
                </tr>
              ) : (
                <tr>
                  <td colSpan={5} className="text-red-500 text-center">
                    Belum melakukan presensi keluar.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
