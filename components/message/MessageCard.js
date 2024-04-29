"use client";

import { createClient } from "@/lib/supabase/client";

import { useRef, useState } from "react";
import MessageHeader from "./MessageHeader";
import MessageList from "./MessageList";
import NewMessage from "./NewMessage";

const MessageCard = ({ userdata, myid, id, created_at, userid }) => {
  const scrollRef = useRef();
  const supabase = createClient();

  const scrolToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scroll({
        top: scrollRef.current.scrollHeight,
        left: 0,
        behavior: "smooth",
      });
    }
  };

  const [online , setOnline] = useState()

  const roomOne = supabase.channel(`room-${id}`);

  const userStatus = {
    user: myid,
    online_at: new Date().toISOString(),
  };

  roomOne
    .on("presence", { event: "join" }, ({ key, newPresences }) => {
      console.log({ userid: userid, new: newPresences[0].user });
      if (newPresences[0].user && userid && newPresences[0].user === userid) {
        setOnline(true)
      }
    })
    .on("presence", { event: "leave" }, ({ key, leftPresences }) => {
      console.log("leave", key, leftPresences);
    })
    .subscribe(async (status) => {
      if (status !== "SUBSCRIBED") {
        return;
      }
      await roomOne.track(userStatus);
    });

    console.log(online);

  return (
    <div
      ref={scrollRef}
      className="noscroll mt-[6rem] flex flex-col h-[80vh] overflow-y-auto justify-between"
    >
      <MessageHeader data={userdata} userid={userid} myid={myid} />
      <div className="font-alibaba inline text-sm text-center py-6 text-zinc-400 ">
        این مکالمه در تاریخ {new Date(created_at).toLocaleString("fa-IR", { dateStyle: "medium" })}{" "}
        ایجاد شد.
      </div>
      <MessageList myid={myid} id={id} scrolToBottom={scrolToBottom} />
      <NewMessage myid={myid} id={id} />
    </div>
  );
};

export default MessageCard;
