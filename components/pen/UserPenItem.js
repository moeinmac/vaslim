import { timeSince } from "@/lib/timeSince";
import { SlShareAlt } from "react-icons/sl";

import StampButton from "./StampButton";
import Link from "next/link";
import CommentButton from "./CommentButton";

const UserPenItem = ({ pen, myUsername }) => {
  const convertedDate = new Date(pen.created_at);
  return (
    <Link href={`/pen/${pen.id}`} className="penItem_bg rounded-xl flex flex-col p-4 gap-4 pb-2">
      <header className="flex justify-between items-center">
        <p className="font-alibaba text-[0.6rem]">{timeSince(convertedDate)}</p>
        <SlShareAlt />
      </header>
      <article className="px-2 font-alibaba whitespace-pre-wrap">{pen.pen}</article>
      <footer className="flex justify-between items-center mt-2">
        <StampButton id={pen.id} stamp={pen.stamp} myUsername={myUsername} />
        <CommentButton comment={pen.comment} />
      </footer>
    </Link>
  );
};

export default UserPenItem;
