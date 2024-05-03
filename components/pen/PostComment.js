"use client";

import Link from "next/link";
import SubmitButton from "../Auth/SubmitButton";
import { useState } from "react";
import { sendComment, sendReply } from "@/lib/pen/sendComment";
import { FaTimes } from "react-icons/fa";

const PostComment = ({ myUsername, id, userUsername, isReply, cancelReplyHandler }) => {
  const [commentValue, setCommentValue] = useState("");
  const changeValueHander = (event) => setCommentValue(event.target.value);
  const sendNewComment = () => {
    if (isReply) sendReply(commentValue, id, myUsername, isReply);
    if (!isReply) sendComment(commentValue, id, myUsername);
    setCommentValue("");
  };
  return (
    <form className="w-full px-3 py-2 flex flex-col gap-2 fixed bottom-[4.45rem] bg-black border-t-2 border-blue z-10">
      <header className="flex items-center justify-between">
        <div className="flex font-alibaba items-center gap-2 text-sm">
          {isReply && (
            <>
              <p>ارسال پاسخ به</p>
              <Link href={`/${isReply.username}`}>{isReply.username}@</Link>
              <div onClick={cancelReplyHandler}>
                <FaTimes />
              </div>
            </>
          )}
          {!isReply && (
            <>
              <p>ارسال نظر به</p>
              <Link href={`/${userUsername}`}>{userUsername}@</Link>
            </>
          )}
        </div>
        <SubmitButton
          formAction={sendNewComment}
          pendingText="میفرستم بــراش..."
          className="font-kalameh text-black text-2xl bg-orange px-2 py-1 rounded-lg"
        >
          بِــفِــرس براش
        </SubmitButton>
      </header>
      <textarea
        value={commentValue}
        onChange={changeValueHander}
        className="p-2 rounded-lg stamp focus:outline-0 resize-none font-alibaba"
      ></textarea>
    </form>
  );
};

export default PostComment;
