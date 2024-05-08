"use client";

import { useRef } from "react";
import MessageHeader from "./MessageHeader";
import MessageList from "./MessageList";
import NewMessage from "./NewMessage";
import MessageItem from "./MessageItem";
import useNewMessage from "@/lib/message/useNewMessage";
import { BsSend } from "react-icons/bs";
import useUserOnline from "@/lib/message/useUserOnline";

const MessageCard = ({ userdata, myid, id, created_at, userid }) => {
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

  const { loadingMessage, sendNewMessage } = useNewMessage(id, userid);
  const { online, sendOnlineUser } = useUserOnline(myid, userid, id);
  const sendMessageHandler = async (message) => {
    await sendNewMessage(message, online);
  };

  return (
    <>
      <div
        ref={scrollRef}
        className="noscroll mt-[6rem] flex flex-col h-[80vh] overflow-y-auto justify-between"
      >
        <MessageHeader data={userdata} online={online} sendOnlineUser={sendOnlineUser} />

        <div className="font-alibaba inline text-sm text-center py-6 text-zinc-400 ">
          این مکالمه در تاریخ{" "}
          {new Date(created_at).toLocaleString("fa-IR", { dateStyle: "medium" })} ایجاد شد.
          {userid === "5af81674-ba0f-4ffa-9d73-efadcdde153b" && (
            <p className="font-alibaba mt-4 px-6 py-4 text-right penItem_bg mr-8 text-white rounded-lg rounded-bl-[3rem] rounded-tl-sm">
              سلام وقت شما بخیر ! خیلی خوشحال میشویم اگر مشکلات انتقادات و حتی پیشنهادات خود را با
              ما در میان بگذارید ، خیلی زود به شما پاسخ خواهیم داد. امیدوارم همیشه وصل بمانید!
            </p>
          )}
        </div>

        {<MessageList myid={myid} id={id} scrolToBottom={scrolToBottom} />}
        {loadingMessage && (
          <div className="flex items-center gap-3 mr-3">
            <BsSend className="text-lg" />
            <MessageItem message={loadingMessage} myid={myid} isLoading />
          </div>
        )}
        {<NewMessage myid={myid} sendMessageHandler={sendMessageHandler} />}
      </div>
    </>
  );
};

export default MessageCard;
