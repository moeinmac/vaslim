import Image from "next/image";
import VerifiedButton from "../user/VerfiedButton";
import { timeSince } from "@/lib/timeSince";
import { LiaReplyAllSolid } from "react-icons/lia";
import Link from "next/link";

const ReplyItem = ({ data }) => {
  const convertedDate = new Date(data.replied_at);
  return (
    <div className="bg-black p-2 mr-3 mt-2 rounded-lg">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Image
            width={40}
            height={40}
            src={data.user.profile}
            alt={data.user.fullname}
            className="rounded-lg"
          />
          <div className="flex flex-col gap-1">
            <p className="font-alibaba text-[0.75rem]">{data.user.fullname}</p>
            <VerifiedButton
              isVerified={data.user.isVerified}
              username={data.username}
              small
              className="text-[0.65rem]"
            />
          </div>
        </div>
        <p className="font-alibaba text-[0.6rem]">{timeSince(convertedDate)}</p>
      </header>
      <p className="px-1 py-2 font-alibaba text-sm text-[#b9bac7]">پاسخ داد : </p>
      <article className="px-3 font-alibaba whitespace-pre-wrap">{data.comment}</article>
    </div>
  );
};

const CommentItem = ({ data, isAuthor, sendReplyData }) => {
  const isReply = data.reply && data.reply.username;
  const convertedDate = new Date(data.posted_at);

  const sendReplyDataHandler = () => sendReplyData(data.username, data.posted_at);

  return (
    <div className="penItem_bg px-3 py-2 pt-0 last:rounded-bl-xl last:rounded-br-xl">
      <div className="stamp p-2 rounded-lg">
        <header className="flex items-center justify-between">
          <Link href={`/${data.username}`} className="flex items-center gap-3">
            <Image
              width={45}
              height={45}
              src={data.user.profile}
              alt={data.user.fullname}
              className="rounded-lg"
            />
            <div className="flex flex-col gap-1">
              <p className="font-alibaba text-[0.75rem]">{data.user.fullname}</p>
              <VerifiedButton
                isVerified={data.user.isVerified}
                username={data.username}
                small
                className="text-[0.7rem]"
              />
            </div>
          </Link>
          <p className="font-alibaba text-[0.6rem]">{timeSince(convertedDate)}</p>
        </header>
        {isAuthor && !isReply && (
          <div className="flex justify-between items-center text-sm  text-[#b9bac7]">
            <p className="px-1 py-2 font-alibaba ">چنین گــفت : </p>
            <button onClick={sendReplyDataHandler} className="flex gap-1 items-center">
              <span>پاسخ دادن </span>
              <LiaReplyAllSolid />
            </button>
          </div>
        )}
        {(!isAuthor || isReply) && (
          <p className="px-1 py-2 font-alibaba text-sm text-[#b9bac7]">چنین گــفت : </p>
        )}
        <article className="px-3 font-alibaba whitespace-pre-wrap">{data.comment}</article>
        {isReply && <ReplyItem data={data.reply} />}
      </div>
    </div>
  );
};

export default CommentItem;
