import { timeSince } from "@/lib/timeSince";
import { SlShareAlt } from "react-icons/sl";
import { TfiComment } from "react-icons/tfi";
import { PiStamp } from "react-icons/pi";

const UserPenItem = ({ pen }) => {
  const convertedDate = new Date(pen.created_at);
  // console.log(timeSince(convertedDate));
  return (
    <div className="penItem_bg rounded-xl flex flex-col p-4 gap-4 pb-2">
      <header className="flex justify-between items-center">
        <p className="font-alibaba text-[0.6rem]">{timeSince(convertedDate)}</p>
        <SlShareAlt />
      </header>
      <main className="px-2">{pen.pen}</main>
      <footer className="flex justify-between items-center mt-2">
        <button className="p-2 rounded-lg flex items-center gap-4 shadow-lg  stamp outline-0">
          <PiStamp className="text-2xl" />
          <span className="font-alibaba text-sm">23</span>
        </button>
        <button className="comment px-2 py-2 flex items-center gap-8 rounded-lg outline-0">
          <span className="font-alibaba text-sm">25 نظر</span>
          <TfiComment />
        </button>
      </footer>
    </div>
  );
};

export default UserPenItem;
