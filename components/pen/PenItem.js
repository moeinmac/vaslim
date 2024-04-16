import CommentButton from "@/components/pen/CommentButton";
import StampButton from "@/components/pen/StampButton";
import Image from "next/image";
import VerifiedButton from "../user/VerfiedButton";
import VaslButton from "@/components/user/VaslButton";
import HeaderPen from "./HeaderPen";
import Link from "next/link";
import { HiUserGroup } from "react-icons/hi";
import BackButton from "../user/BackButton";


const PenItem = ({ pen, user, myUsername ,params}) => {
  const commentListPath = params.stamplist || params.close ? `/pen/${pen.id}` : `/pen/${pen.id}?close=true` 
  return (
    <div className="stamp rounded-xl flex flex-col m-3 mb-0">
      <header className="rounded-xl p-2 flex justify-between px-6 py-4">
        <div className={`flex items-center gap-4`}>
          <Image
            width={60}
            height={60}
            src={user.profile}
            alt={user.fullname}
            className="rounded-lg"
          />
          <div className={`flex flex-col gap-1`}>
            <p className={`font-alibaba text-sm`}>{user.fullname}</p>
            <VerifiedButton
              isVerified={user.isVerified}
              username={user.username}
              small
              className={"text-[0.8rem]"}
            />
          </div>
        </div>
        <div className="flex items-center gap-4">
        <VaslButton vasl={user.vasl.length} username={user.username} />
        <BackButton className={"text-4xl"}/>
        </div>
      </header>
      <article className="whitespace-pre-wrap px-6 font-alibaba">{pen.pen}</article>
      <footer className=" flex flex-col pt-2">
        <div className="flex items-center justify-between p-4">
          <HeaderPen created_at={pen.created_at} />
        </div>
        <div
          className={`penItem_bg flex items-center justify-between p-4 ${
            pen.comment.length === 0 || params.close ? "rounded-bl-xl rounded-br-xl" : ""
          }`}
        >
          <StampButton id={pen.id} stamp={pen.stamp} myUsername={myUsername} />
          {pen.stamp.length !== 0 && (
            <Link
              href={`/pen/${pen.id}?stamplist=${pen.id}`}
              className="shadow-lg bg-blue py-2 px-3 rounded-lg"
            >
              <HiUserGroup className="text-2xl" />
            </Link>
          )}
          <Link href={commentListPath}>
            <CommentButton comment={pen.comment} />
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default PenItem;
