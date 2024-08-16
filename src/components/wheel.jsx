"use client";
import React, { useState } from "react";
import { Wheel } from "react-custom-roulette";
import Click from "./click";
import classNames from "classnames";
import { Button, Modal } from "antd";
import toast, { Toaster } from "react-hot-toast";
const data = [
  {
    option: "0",
    style: { backgroundColor: "#d49001", textColor: "black", fontSize: 43 },
  },
  { option: "1000", style: { backgroundColor: "white", fontSize: 43 } },
  {
    option: "20000",
    style: { backgroundColor: "#d61b5f", fontSize: 38, textColor: "white" },
  },
  { option: "50000", style: { backgroundColor: "#26e320", fontSize: 38 } },
];

export default function SpinWheel({ winValue, loggedIn }) {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [modal1Open, setModal1Open] = useState(false);
  const [modal2Open, setModal2Open] = useState(false);

  const notify = () => {
    toast("Congrats you won " + data[prizeNumber].option, {
      icon: "👏",
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });
  };

  const handleSpinClick = () => {
    if (!mustSpin) {
      const newPrizeNumber = Math.floor(Math.random() * data.length);
      setPrizeNumber(newPrizeNumber);
      setMustSpin(true);
    }
  };

  return (
    <>
      <Click>
        <div
          className=" flex flex-col gap-5 justify-between items-center bg-[#040542] text-white shadow rounded-lg my-4 p-8 hover:scale-105 transition cursor-pointer relative wheel overflow-hidden"
          onClick={() => setModal2Open(true)}
        >
          <div>
            <h3 className="uppercase italic text-lg font-bold">
              {loggedIn ? "Spin and Win" : "Login to Spin"}
            </h3>
          </div>
        </div>
      </Click>

      <Modal
        title="Spin wheel and Try Your Luck"
        centered
        open={modal2Open}
        onCancel={() => setModal2Open(false)}
        footer={null}
      >
        <div className="flex justify-center items-center my-4 gap-4 flex-col">
          <Wheel
            mustStartSpinning={mustSpin}
            prizeNumber={prizeNumber}
            data={data}
            onStopSpinning={() => {
              setMustSpin(false);
              notify();
              winValue(data[prizeNumber].option);
            }}
          />

          <Click noTap={!mustSpin}>
            <button
              className={classNames(
                "bg-[#040542]  text-white shadow rounded-lg px-4 py-2",
                {
                  "cursor-not-allowed": mustSpin,
                }
              )}
              onClick={loggedIn && handleSpinClick}
              disabled={mustSpin} // Disable the button while spinning
            >
              {loggedIn ? "SPIN" : "Please Login to spin"}
            </button>
          </Click>
        </div>
      </Modal>
      <Toaster />
    </>
  );
}
