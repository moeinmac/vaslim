"use client";

import { handleNewMessage } from "@/lib/message/handleNewMessage";
import { useRouter } from "next/navigation";
import { useState } from "react";

const UserMessageButton = ({ myid, userid, userMessage, myMessage }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const userMessageHandler = async () => {
    setLoading(true);
    const id = await handleNewMessage(userid, myid, userMessage, myMessage);
    router.push(`message/${id}`);
    setLoading(false);
  };

  return (
    <button
      disabled={loading}
      onClick={userMessageHandler}
      className="font-kalameh text-3xl py-2 rounded-xl w-full border-4 border-white text-center"
    >
      {loading ? "صبر کنید" : "پیام دهید"}
    </button>
  );
};

export default UserMessageButton;
