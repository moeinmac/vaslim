import { timeSince } from "@/lib/timeSince";
import { SlShareAlt } from "react-icons/sl";
import { TfiComment } from "react-icons/tfi";
import { persianNumbers } from "@/lib/persianNumbers";
import StampButton from "./StampButton";

const UserPenItem = ({ pen , myUsername}) => {
  const convertedDate = new Date(pen.created_at);
  return (
    <div className="penItem_bg rounded-xl flex flex-col p-4 gap-4 pb-2">
      <header className="flex justify-between items-center">
        <p className="font-alibaba text-[0.6rem]">{timeSince(convertedDate)}</p>
        <SlShareAlt />
      </header>
      <article className="px-2 font-alibaba whitespace-pre-wrap">{pen.pen}</article>
      <footer className="flex justify-between items-center mt-2">
        <StampButton id={pen.id} stamp={pen.stamp} myUsername={myUsername}/>
        <button className="comment px-2 py-2 flex items-center gap-8 rounded-lg outline-0">
          <span className="font-alibaba text-sm">
            {pen.comment ? persianNumbers(pen.comment.length) : persianNumbers(0)} نظر
          </span>
          <TfiComment />
        </button>
      </footer>
    </div>
  );
};

export default UserPenItem;
