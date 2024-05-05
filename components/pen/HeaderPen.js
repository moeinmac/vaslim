"use client";
import { timeSince } from "@/lib/timeSince";
import useCopy from "@/lib/useCopy";
import { SlShareAlt } from "react-icons/sl";

const HeaderPen = ({ created_at, pen_id }) => {
  const convertedDate = new Date(created_at);
  const {isCopied , copyToClipBoard} = useCopy(`vaslim.vercel.app/pen/${pen_id}`);
  
  return (
    <>
      <p className="font-alibaba text-[0.6rem]">{timeSince(convertedDate)}</p>
      <div className="flex items-center gap-2">
        {isCopied && <p className="font-alibaba text-xs">لینک این قلم در کلیپ بورد شما کپی شد</p>}
        <SlShareAlt onClick={copyToClipBoard} className="text-xl" />
      </div>
    </>
  );
};

export default HeaderPen;
