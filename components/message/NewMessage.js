"use client";
import { createClient } from "@/lib/supabase/client";
import { useRef } from "react";
import TextareaAutosize from "react-textarea-autosize";

import { RiSendPlane2Fill } from "react-icons/ri";

const NewMessage = ({ myid, id }) => {
  const inputRef = useRef();

  const supabase = createClient();
  const newChannel = supabase.channel(`room-${id}`);
  const sendMessageHandler = async () => {
    const message = {
      text: inputRef.current.value,
      time: new Date().toISOString(),
      send_by: myid,
    };
    newChannel.send({
      type: "broadcast",
      event: "message",
      payload: message,
    });
    supabase.removeChannel(newChannel);
    await supabase.rpc("append_message", {
      message_id: id,
      message_data: message,
    });

    inputRef.current.value = "";
  };

  return (
    <div className="fixed bottom-0 z-20 flex self-end w-full items-center py-[1.3rem] stamp rounded-tl-xl rounded-tr-xl">
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
