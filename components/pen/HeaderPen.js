"use client";
import { timeSince } from "@/lib/timeSince";
import { useEffect, useState } from "react";
import { SlShareAlt } from "react-icons/sl";

const HeaderPen = ({ created_at, pen_id }) => {
  const [isCopied, setIsCopied] = useState();

  const convertedDate = new Date(created_at);
  const copyToClipBoard = async () => {
    await navigator.clipboard.writeText(`vaslim.vercel.app/pen/${pen_id}`);
    setIsCopied(true);
  };

  useEffect(() => {
    if (isCopied) {
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    }
  }, [isCopied]);
  return (
    <>
      <p className="font-alibaba text-[0.6rem]">{timeSince(convertedDate)}</p>
      <div className="flex items-center gap-2">
        {isCopied && <p className="font-alibaba text-xs">لینک این قلم در کلیپ بورد شما کپی شد</p>}
        <SlShareAlt onClick={copyToClipBoard} />
      </div>
    </>
  );
};

export default HeaderPen;
