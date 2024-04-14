import CommentButton from "@/components/pen/CommentButton";
import StampButton from "@/components/pen/StampButton";
import Image from "next/image";
import VerifiedButton from "../user/VerfiedButton";
import VaslButton from "@/components/user/VaslButton";
import HeaderPen from "./HeaderPen";

const PenItem = ({ pen, user, myUsername }) => {
  return (
    <div className="stamp rounded-xl flex flex-col m-3 mb-0">
      <header className="rounded-xl p-2 flex justify-between px-6 py-4">
        <div className={`flex items-center gap-4`}>
          <Image
            width={60}
            height={60}
            src={user.profile}
            priority
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
        <VaslButton vasl={user.vasl.length} username={user.username} />
      </header>
      <article className="whitespace-pre-wrap px-6 font-alibaba">{pen.pen}</article>
      <footer className=" flex flex-col pt-2">
        <div className="flex items-center justify-between p-4">
          <HeaderPen created_at={pen.created_at} />
        </div>
        <div
          className={`penItem_bg flex items-center justify-between p-4 ${
            pen.comment.length === 0 ? "rounded-bl-xl rounded-br-xl" : ""
          }`}
        >
          <StampButton id={pen.id} stamp={pen.stamp} myUsername={myUsername} />
          <CommentButton comment={pen.comment} />
        </div>
      </footer>
    </div>
  );
};

export default PenItem;
