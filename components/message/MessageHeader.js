"use client";
import React, { useEffect } from "react";
import { IoReturnUpBackSharp } from "react-icons/io5";
import Profile from "../user/Profile";
import { useRouter } from "next/navigation";
import { clearUnreadMessage } from "@/lib/message/clearUnreadMessage";

const MessageHeader = ({ data, myid, message_id, online, sendOnlineUser }) => {
  const router = useRouter();

  useEffect(() => {
    sendOnlineUser();
  }, []);

  const backToMessageHandler = async () => {
    await clearUnreadMessage(message_id, myid, true);
    router.back();
  };

  return (
    <header className="fixed top-0 bg-black w-full px-6 py-4 flex items-center justify-between border-b-2 border-zinc-900">
      <div className="relative">
        <Profile
          profile={data.profile}
          fullname={data.fullname}
          username={data.username}
          isVerified={data.isVerified}
          small={true}
        />
        {online && (
          <div className="absolute -right-2 -bottom-2 w-4 h-4 rounded-full bg-green-500"></div>
        )}
      </div>
      <IoReturnUpBackSharp className="text-4xl" onClick={backToMessageHandler} />
    </header>
  );
};

export default React.memo(MessageHeader);
