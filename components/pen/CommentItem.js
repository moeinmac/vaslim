import Image from "next/image";
import VerifiedButton from "../user/VerfiedButton";
import { timeSince } from "@/lib/timeSince";
import { LiaReplyAllSolid } from "react-icons/lia";
import Link from "next/link";

const CommentItem = ({ data, isAuthor }) => {
  const convertedDate = new Date(data.posted_at);
  return (
    <div className="penItem_bg px-3 py-2 pt-0 last:rounded-bl-xl last:rounded-br-xl">
      <div className="stamp p-2 rounded-lg">
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image
              width={45}
              height={45}
              src={data.profile}
              alt={data.fullname}
              className="rounded-lg"
            />
            <div className="flex flex-col gap-1">
              <p className="font-alibaba text-[0.75rem]">{data.fullname}</p>
              <VerifiedButton
                isVerified={data.isVerified}
                username={data.username}
                small
                className="text-[0.7rem]"
              />
            </div>
          </div>
          <p className="font-alibaba text-[0.6rem]">{timeSince(convertedDate)}</p>
        </header>
        {isAuthor && (
          <div className="flex justify-between items-center text-sm  text-[#b9bac7]">
            <p className="px-1 py-2 font-alibaba ">چنین گــفت : </p>
            <Link
              href={`?reply=${convertedDate.getTime()}-${data.username}`}
              className="flex gap-1 items-center"
            >
              <span>پاسخ دادن </span>
              <LiaReplyAllSolid />
            </Link>
          </div>
        )}
        {!isAuthor && (
          <p className="px-1 py-2 font-alibaba text-sm text-[#b9bac7]">چنین گــفت : </p>
        )}
        <article className="px-3 font-alibaba whitespace-pre-wrap">{data.comment}</article>
      </div>
    </div>
  );
};

export default CommentItem;
