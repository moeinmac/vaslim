import { timeSince } from "@/lib/timeSince";
import { SlShareAlt } from "react-icons/sl";
import { TfiComment } from "react-icons/tfi";
import { persianNumbers } from "@/lib/persianNumbers";
import StampButton from "./StampButton";
import Image from "next/image";
import { HiMiniEllipsisVertical } from "react-icons/hi2";
import Link from "next/link";

const HomePenItem = ({ pen, myUsername, profile, fullname, username }) => {
  const convertedDate = new Date(pen.created_at);
  return (
    <div className="stamp rounded-xl">
      <Link href={`/${username}`} className="p-3 flex gap-2 items-center">
        <Image src={profile} width={50} height={50} alt={fullname} className="rounded-xl" />
        <div className="flex items-center justify-between w-full">
          <div>
            <p className="font-alibaba">{fullname}</p>
            <p className="font-alibaba text-sm">{username}@</p>
          </div>
          <HiMiniEllipsisVertical className="text-2xl" />
        </div>
      </Link>
      <div className="penItem_bg rounded-xl flex flex-col p-4 gap-3 pb-2">
        <header className="flex justify-between items-center">
          <p className="font-alibaba text-[0.6rem]">{timeSince(convertedDate)}</p>
          <SlShareAlt />
        </header>
        <main className="px-2 font-alibaba">{pen.pen}</main>
        <footer className="flex justify-between items-center mt-2">
          <StampButton id={pen.id} stamp={pen.stamp} myUsername={myUsername} />
          <button className="comment px-2 py-2 flex items-center gap-8 rounded-lg outline-0">
            <span className="font-alibaba text-sm">
              {pen.comment ? persianNumbers(pen.comment.length) : persianNumbers(0)} نظر
            </span>
            <TfiComment />
          </button>
        </footer>
      </div>
    </div>
  );
};

export default HomePenItem;
