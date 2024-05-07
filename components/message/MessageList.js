"use client";
import { createClient } from "@/lib/supabase/client";
import MessageItem from "./MessageItem";
import { useEffect, useState } from "react";

const MessageList = ({ myid, id, scrolToBottom }) => {
  const supabase = createClient();
  const [messages, setMessages] = useState([]);

  // const messageChannel = supabase.channel(`room-${id}`);

  // const messageReceived = (payload) => {
  //   setMessages((prevState) => [...prevState, payload.payload]);
  // };

  // messageChannel
  //   .on("broadcast", { event: "message" }, (payload) => messageReceived(payload))
  //   .subscribe();

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
      {messages.map((message, index) => {
        if (index !== 0) {
          const timeDiff =
            new Date(messages[index].time).getDay() - new Date(messages[index - 1].time).getDay();
          if (Math.abs(timeDiff) >= 1) {
            return (
              <>
                <div
                  key={message.time}
                  className="font-alibaba inline text-sm text-center mt-3 self-center text-zinc-400"
                >
                  {new Date(message.time).toLocaleString("fa-IR", { dateStyle: "medium" })}
                </div>
                <MessageItem message={message} myid={myid} key={Math.random()} />
              </>
            );
          }
        }

        return <MessageItem message={message} myid={myid} key={Math.random()} />;
      })}
    </div>
  );
};

export default MessageList;
