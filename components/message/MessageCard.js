"use client";

import { useEffect, useRef } from "react";
import MessageHeader from "./MessageHeader";
import MessageList from "./MessageList";
import NewMessage from "./NewMessage";

const MessageCard = ({ userdata, myid, id }) => {
  const scrollRef = useRef();

  const scrolToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scroll(0, scrollRef.current.scrollHeight);
    }
  };

  return (
    <div
      ref={scrollRef}
      className="pt-[6rem] pb-[5.5rem] flex flex-col h-screen overflow-y-auto justify-between"
    >
      <MessageHeader data={userdata} />
      <MessageList myid={myid} id={id} scrolToBottom={scrolToBottom} />
      <NewMessage myid={myid} id={id} />
    </div>
  );
};

export default MessageCard;
