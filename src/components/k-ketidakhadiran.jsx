import React, { useState } from "react";
import Home from "./k-home";
import Logout from "./logout";
import Button from "./Button";

export default function Ketidakhadirankaryawan() {
  return (
    <>
      <div className="flex flex-row">
        <Home />
        <div className="absolute top-6 right-10">
          <Logout />
        </div>
        <div className="mt-32 ml-32 flex flex-col">
          <div>
            <h1 className="font-heading text-3xl mb-10">Ketidak Hadiran</h1>
            <Button
              className={
                "text-center rounded-base shadow-light border font-extrabold text-2xl flex justify-center absolute  text-text border-border w-48 py-3 bg-green-500"
              }
            >
              Ajukan
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
