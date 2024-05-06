import { RiMessage3Line } from "react-icons/ri";
import { RiMessage3Fill } from "react-icons/ri";

import { createClient } from "@/lib/supabase/client";
import { useState, useEffect } from "react";
import Pulse from "../notification/Pulse";

const MessageTabbar = ({ active, activeStyle }) => {
  // const [isUnRead, setIsUnRead] = useState(false);
  // const [messages, setMessages] = useState([]);
  // const [myid, setmyid] = useState(false);

  // console.log({ myid, isUnRead, messages });

  const supabase = createClient();

  const getUserMessages = async () => {
    // if (myid) {
    //   const { data } = await supabase.from("user").select("message").eq("id", myid).single();
    //   return data.message;
    // }
    const myAuth = await supabase.auth.getUser();
    const { data } = await supabase
      .from("user")
      .select("message")
      .eq("id", myAuth.data.user.id)
      .single();
    // setmyid(myAuth.data.user.id);
    return data.message;
  };

  const getIsUnreadMessage = (messages) => {
    messages.forEach((messageItem) => {
      if (messageItem.hasOwnProperty("unread") && messageItem.unread >= 1) return true;
    });
    return false;
  };

  // useEffect(() => {
  //   const fetchUnReadMessages = async () => {
  //     if (messages.length === 0) {
  //       const messageList = await getUserMessages();
  //       const unread = getIsUnreadMessage(messageList);
  //       setIsUnRead(unread);
  //       setMessages(messageList);
  //     } else {
  //       const unread = getIsUnreadMessage(messages);
  //       setIsUnRead(unread);
  //     }
  //   };
  //   fetchUnReadMessages();
  // }, []);

  // const handleChanges = (paylod) => {
  //   if (paylod.new.id === myid) setMessages(paylod.new.message);
  // };
  // supabase
  //   .channel("updateUser")
  //   .on("postgres_changes", { event: "UPDATE", schema: "public", table: "user" }, handleChanges)
  //   .subscribe();

  return active !== "message" ? (
    <div className="relative">
      <RiMessage3Line className="text-[2.2rem]" />
      {/* {isUnRead && (
        <Pulse className={"w-3 h-3 bg-orange bottom-0 left-0 shadow-none shadow-[#ff793f]"} />
      )} */}
    </div>
  ) : (
    <RiMessage3Fill className={`text-[2.2rem] ${activeStyle}`} />
  );
};

export default MessageTabbar;
