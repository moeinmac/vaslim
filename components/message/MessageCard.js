"use client";

import { useRef, useState } from "react";
import MessageHeader from "./MessageHeader";
import MessageList from "./MessageList";
import NewMessage from "./NewMessage";
import MessageItem from "./MessageItem";
import { createClient } from "@/lib/supabase/client";

const MessageCard = ({ userdata, myid, id, created_at, userid }) => {
  const scrollRef = useRef();
  const [lodingMessage, setLoadingMessage] = useState(false);
  console.log(lodingMessage);
  const scrolToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scroll({
        top: scrollRef.current.scrollHeight,
        left: 0,
        behavior: "smooth",
      });
    }
  };

  const supabase = createClient();
  const messageChannel = supabase.channel(`room-${id}`);

  const sendMessageHandler = async (message) => {
    setLoadingMessage(message);
    await supabase.rpc("append_message", {
      message_id: id,
      message_data: message,
    });
    messageChannel.send({
      type: "broadcast",
      event: "message",
      payload: message,
    });
    await supabase.removeChannel(messageChannel);
    return setLoadingMessage(false);
  };

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
      {lodingMessage && <MessageItem message={lodingMessage} myid={myid} isLoading />}
      <NewMessage myid={myid} id={id} sendMessageHandler={sendMessageHandler} />
    </div>
  );
};

export default MessageCard;
