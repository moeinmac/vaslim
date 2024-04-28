import StampButton from "./StampButton";
import Link from "next/link";
import CommentButton from "./CommentButton";
import HeaderPen from "./HeaderPen";

const UserPenItem = ({ pen, myid }) => {
  return (
    <Link href={`/pen/${pen.id}`} className="penItem_bg rounded-xl flex flex-col p-4 gap-4 pb-2">
      <header className="flex justify-between items-center">
        <HeaderPen created_at={pen.created_at} pen_id={pen.id}/>
      </header>
      <article className="px-2 font-alibaba whitespace-pre-wrap">{pen.pen}</article>
      <footer className="flex justify-between items-center mt-2">
        <StampButton id={pen.id} stamp={pen.stamp} myid={myid} />
        <CommentButton comment={pen.comment} />
      </footer>
    </Link>
  );
};

export default UserPenItem;
