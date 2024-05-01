import { RiMessage3Line } from "react-icons/ri";
import { RiMessage3Fill } from "react-icons/ri";

import { createClient } from "@/lib/supabase/client";
import { useState, useEffect } from "react";
import Pulse from "../notification/Pulse";

const MessageTabbar = ({ active, activeStyle }) => {
  const supabase = createClient();

  const [isUnRead, setIsUnRead] = useState(false);

  const getIsUnreadMessage = async () => {
    let unread = false;
    const myAuth = await supabase.auth.getUser();
    const { data } = await supabase
      .from("user")
      .select("message")
      .eq("id", myAuth.data.user.id)
      .single();
    data.message.forEach((messageItem) => {
      if (messageItem.hasOwnProperty("unread") && messageItem.unread >= 1) unread = true;
    });
    if (unread) setIsUnRead(true);
    else setIsUnRead(false);
  };

  useEffect(() => {
    getIsUnreadMessage();
  }, []);

  return active !== "message" ? (
    <div className="relative">
      <RiMessage3Line className="text-[2.2rem]" />
      {isUnRead && (
        <Pulse className={"w-3 h-3 bg-orange bottom-0 left-0 shadow-none shadow-[#ff793f]"} />
      )}
    </div>
  ) : (
    <RiMessage3Fill className={`text-[2.2rem] ${activeStyle}`} />
  );
};

export default MessageTabbar;
