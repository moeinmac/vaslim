import StampButton from "./StampButton";
import Link from "next/link";
import CommentButton from "./CommentButton";
import HeaderPen from "./HeaderPen";
import UserHeaderPen from "./UserHeaderPen";

const UserPenItem = ({ pen, myid, isMyPen }) => {
  return (
    <>
      <div className="relative penItem_bg rounded-xl flex flex-col p-4 gap-4 pb-2">
        <header className="flex justify-between items-center">
          {isMyPen && <UserHeaderPen created_at={pen.created_at} pen_id={pen.id} pen={pen.pen} />}
          {!isMyPen && <HeaderPen created_at={pen.created_at} pen_id={pen.id} />}
        </header>
        <Link href={`/pen/${pen.id}`}>
          <article className="px-2 font-alibaba whitespace-pre-wrap">{pen.pen}</article>
          <footer className="flex justify-between items-center mt-2">
            <StampButton id={pen.id} stamp={pen.stamp} myid={myid} />
            <CommentButton comment={pen.comment} />
          </footer>
        </Link>
      </div>
    </>
  );
};

export default UserPenItem;
