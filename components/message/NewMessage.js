"use client";
import { createClient } from "@/lib/supabase/client";
import { useRef } from "react";
import TextareaAutosize from "react-textarea-autosize";

import { RiSendPlane2Fill } from "react-icons/ri";

const NewMessage = ({ myid }) => {
  const inputRef = useRef();

  const supabase = createClient();
  const newChannel = supabase.channel("test-room");

  const sendMessageHandler = () => {
    const now = new Date();
    newChannel.send({
      type: "broadcast",
      event: "message",
      payload: {
        text: inputRef.current.value,
        time: `${now.getMinutes()} : ${now.getHours()}`,
        send_by: myid,
      },
    });
    supabase.removeChannel(newChannel);
    inputRef.current.value = ""
  };

  return (
    <div className="flex self-end w-full items-center py-[1.3rem] stamp rounded-tl-xl rounded-tr-xl">
      <button className="px-4" onClick={sendMessageHandler}>
        <RiSendPlane2Fill className="text-3xl text-[#5D85DD]" />
      </button>
      <TextareaAutosize
        ref={inputRef}
        placeholder="یه چیزی بگــو..."
        minRows={1}
        dir="auto"
        maxRows={4}
        maxLength={100}
        className="bg-transparent resize-none outline-0 text-lg overflow-hidden w-full font-alibaba pl-2 pr-1"
      ></TextareaAutosize>
    </div>
  );
};

export default NewMessage;
