"use client";
import { useEffect } from "react";
import { IoReturnUpBackSharp } from "react-icons/io5";
import Profile from "../user/Profile";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

const MessageHeader = ({ data, myid, message_id }) => {
  const supabase = createClient();
  const messageChannel = supabase.channel(`room-${message_id}`);
  const router = useRouter();

  useEffect(() => {
    messageChannel.send({
      type: "broadcast",
      event: "message",
      payload: { type: "join", id: myid },
    });
  }, []);

  const backToMessageHandler = () => {
    messageChannel.send({
      type: "broadcast",
      event: "message",
      payload: { type: "leave", id: myid },
    });
    router.back();
  };

  return (
    <header className="fixed top-0 bg-black w-full px-6 py-4 flex items-center justify-between border-b-2 border-zinc-900">
      <Profile
        profile={data.profile}
        fullname={data.fullname}
        username={data.username}
        isVerified={data.isVerified}
        small={true}
      />
      <IoReturnUpBackSharp className="text-4xl" onClick={backToMessageHandler} />
    </header>
  );
};

export default MessageHeader;
