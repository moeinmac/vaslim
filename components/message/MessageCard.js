"use client";
import MessageHeader from "./MessageHeader";
import MessageList from "./MessageList";
import NewMessage from "./NewMessage";

const MessageCard = ({ userdata, myid, id }) => {
  return (
    <div className="pt-[6rem] pb-[5.5rem] flex flex-col h-screen overflow-y-auto justify-between">
      <MessageHeader data={userdata} />
      <MessageList myid={myid} id={id} />
      <NewMessage myid={myid} id={id} />
    </div>
  );
};

export default MessageCard;
