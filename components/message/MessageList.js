"use client";
import MessageItem from "./MessageItem";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

const MessageList = ({ myid, id }) => {
  const supabase = createClient();
  const [messages, setMessages] = useState([]);
  const newChannel = supabase.channel(`room-${id}`);

  useEffect(() => {
    const loadMessages = async (id) => {
      const { data } = await supabase.from("message").select("messages").eq("id", id).single();
      setMessages(data.messages);
    };
    loadMessages(id);
  }, []);

  const messageReceived = (payload) => {
    setMessages((prevState) => [...prevState, payload.payload]);
    supabase.removeChannel(newChannel);
  };

  newChannel
    .on("broadcast", { event: "message" }, (payload) => messageReceived(payload))
    .subscribe();

  return (
    <div className="flex-1 flex gap-3 flex-col items-start py-24">
      {messages.map((message) => (
        <MessageItem message={message} myid={myid} key={Math.random()} />
      ))}
    </div>
  );
};

export default MessageList;
