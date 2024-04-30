"use client";
import { createClient } from "@/lib/supabase/client";
import MessageItem from "./MessageItem";
import { useEffect, useState } from "react";

const MessageList = ({ myid, id, scrolToBottom, setOnlineUser }) => {
  const supabase = createClient();
  const [messages, setMessages] = useState([]);

  const messageChannel = supabase.channel(`room-${id}`);

  const messageReceived = (payload) => {
    if (payload.payload.type && payload.payload.type === "join" && payload.payload.id !== myid) {
      setOnlineUser(true);
      return;
    }
    if (payload.payload.type && payload.payload.type === "leave" && payload.payload.id !== myid) {
      setOnlineUser(false);
      return;
    }
    setMessages((prevState) => [...prevState, payload.payload]);
    supabase.removeChannel(messageChannel);
  };

  messageChannel
    .on("broadcast", { event: "message" }, (payload) => messageReceived(payload))
    .subscribe();

  useEffect(() => {
    const loadMessages = async (id) => {
      const { data } = await supabase.from("message").select("messages").eq("id", id).single();
      setMessages(data.messages);
    };
    loadMessages(id);
  }, []);

  useEffect(() => {
    scrolToBottom();
  }, [messages]);

  return (
    <div className="flex-1 flex gap-3 flex-col items-start justify-end">
      {messages.map((message) => (
        <MessageItem message={message} myid={myid} key={Math.random()} />
      ))}
    </div>
  );
};

export default MessageList;
