"use client";

import Link from "next/link";
import SubmitButton from "../Auth/SubmitButton";
import { sendComment } from "@/lib/pen/sendComment";

const PostComment = ({ myUsername, id, userUsername }) => {
  const [commentValue , setCommentValue] = useState("")
  const changeValueHander = (event) => setCommentValue(event.target.value);

  const sendNewComment = () => {
    sendComment(commentValue, id, myUsername);
    setCommentValue("")
  };
  
  return (
    <form className="py-2 px-4 flex flex-col gap-2 fixed bottom-[4.45rem] bg-transparent border-t-2 border-blue z-10 w-full">
      <header className="flex items-center justify-between">
        <div className="flex font-alibaba items-center gap-2 text-sm">
          <p>در حال ارسال نظر به</p>
          <Link href={`/${userUsername}`}>{userUsername}@</Link>
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
        className="p-2 rounded-lg stamp focus:outline-0 resize-none"
      ></textarea>
    </form>
  );
};

export default PostComment;