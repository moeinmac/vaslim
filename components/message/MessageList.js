"use client";
import MessageItem from "./MessageItem";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

const MessageList = ({ myid }) => {
  const supabase = createClient();
  const [messages, setMessages] = useState([]);
  console.log(messages);
  const newChannel = supabase.channel("test-room");

  const messageReceived = (payload) => {
    setMessages((prevState) => [...prevState, payload.payload]);
    supabase.removeChannel(newChannel);
  };

  newChannel
    .on("broadcast", { event: "message" }, (payload) => messageReceived(payload))
    .subscribe();

  return (
    <div className="flex-1 flex gap-3 flex-col items-start justify-end py-4">
      {messages.map((message) => (
        <MessageItem message={message} myid={myid} key={Math.random()} />
      ))}
    </div>
  );
};

export default MessageList;
