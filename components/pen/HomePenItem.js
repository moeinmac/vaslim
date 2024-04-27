import StampButton from "./StampButton";
import Image from "next/image";
import { HiMiniEllipsisVertical } from "react-icons/hi2";
import Link from "next/link";
import CommentButton from "./CommentButton";
import HeaderPen from "./HeaderPen";
import VerifiedButton from "../user/VerfiedButton";

const HomePenItem = ({ pen, myUsername }) => {
  return (
    <div className="stamp rounded-xl">
      <Link href={`/${pen.user.username}`} className="p-3 flex gap-2 items-center">
        <Image
          src={pen.user.profile}
          width={50}
          height={50}
          alt={pen.user.fullname}
          className="rounded-xl"
        />
        <div className="flex items-center justify-between w-full">
          <div>
            <p className="font-alibaba">{pen.user.fullname}</p>
            {/* <p className="font-alibaba text-sm">{pen.user.username}@</p> */}
            <VerifiedButton isVerified={pen.user.idVerfied} username={pen.user.username}/>
          </div>
          <HiMiniEllipsisVertical className="text-2xl" />
        </div>
      </Link>
      <Link href={`/pen/${pen.id}`} className="penItem_bg rounded-xl flex flex-col p-4 gap-3 pb-2">
        <header className="flex justify-between items-center">
          <HeaderPen created_at={pen.created_at} />
        </header>
        <article className="px-2 font-alibaba whitespace-pre-wrap">{pen.pen}</article>
        <footer className="flex justify-between items-center mt-2">
          <StampButton id={pen.id} stamp={pen.stamp} myUsername={myUsername} />
          <CommentButton comment={pen.comment} />
        </footer>
      </Link>
    </div>
  );
};

export default HomePenItem;
