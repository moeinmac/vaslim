"use client";

import { handleNewMessage } from "@/lib/message/handleNewMessage";
import { useRouter } from "next/navigation";

const UserMessageButton = ({ myid, userid, userMessage, myMessage }) => {
  const router = useRouter();

  const userMessageHandler = async () => {
    const id = await handleNewMessage(userid, myid, userMessage, myMessage);
    router.push(`message/${id}`);
  };

  return (
    <button
      onClick={userMessageHandler}
      className="font-kalameh text-3xl py-2 rounded-xl w-full border-4 border-white text-center"
    >
      پیام دهید
    </button>
  );
};

export default UserMessageButton;
