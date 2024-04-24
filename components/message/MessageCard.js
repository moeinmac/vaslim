"use client";

import { useRef } from "react";
import MessageHeader from "./MessageHeader";
import MessageList from "./MessageList";
import NewMessage from "./NewMessage";

const MessageCard = ({ userdata, myid, id, created_at }) => {
  const scrollRef = useRef();

  const scrolToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scroll({
        top: scrollRef.current.scrollHeight,
        left: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <div
      ref={scrollRef}
      className="noscroll pt-[6rem] pb-[5.5rem] flex flex-col h-screen overflow-y-auto justify-between"
    >
      <MessageHeader data={userdata} />
      <div className="font-alibaba inline text-sm text-center py-6 text-zinc-400 ">
        این مکالمه در تاریخ {new Date(created_at).toLocaleString("fa-IR", { dateStyle: "medium" })} ایجاد شد.
      </div>
      <MessageList myid={myid} id={id} scrolToBottom={scrolToBottom} />
      <NewMessage myid={myid} id={id} />
    </div>
  );
};

export default MessageCard;
