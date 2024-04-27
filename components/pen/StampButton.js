"use client";
import { sendStamp } from "@/lib/pen/sendStamp";
import { unsendStamp } from "@/lib/pen/unsendStamp";
import { persianNumbers } from "@/lib/persianNumbers";
import { useState } from "react";
import { PiStamp, PiCertificateFill } from "react-icons/pi";

const StampButton = ({ stamp, myid, id }) => {
  const isStampedCheck = stamp.find((id) => id === myid);

  const [isStamp, setIsStamp] = useState(isStampedCheck);
  const [stampNumber, setStampNumber] = useState(stamp.length);

  const setStampHandler = async (event) => {
    event.preventDefault();
    if (!isStamp) {
      const newstamp = await sendStamp(id, myid);
      setIsStamp(true);
      setStampNumber(newstamp);
    }
    if (isStamp) {
      const stampnum = await unsendStamp(id, myid);
      setStampNumber(stampnum);
      setIsStamp(false);
    }
  };

  return (
    <button
      onClick={setStampHandler}
      className="py-2 px-3 rounded-lg flex items-center gap-4 shadow-lg  stamp outline-0"
    >
      {!isStamp && <PiStamp className="text-2xl" />}
      {isStamp && <PiCertificateFill className="text-2xl text-orange" />}
      <span className="font-alibaba text-sm">
        {stamp ? persianNumbers(stampNumber) : persianNumbers(0)}
      </span>
    </button>
  );
};

export default StampButton;
