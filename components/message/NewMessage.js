"use client";
// import { createClient } from "@/lib/supabase/client";
// import { useRef } from "react";
import TextareaAutosize from "react-textarea-autosize";

import { RiSendPlane2Fill, RiSendPlane2Line } from "react-icons/ri";

const NewMessage = () => {
  // const supabase = createClient();
  // const newChannel = supabase.channel("test-room");

  // const inputRef = useRef();

  // const sendMessage = () => {
  //   newChannel.send({
  //     type: "broadcast",
  //     event: "message",
  //     payload: { message: inputRef.current.value },
  //   });
  //   supabase.removeChannel(newChannel);
  // };

  return (
    <div className="flex self-end w-full items-center py-[1.3rem] stamp relative z-30 rounded-tl-xl rounded-tr-xl">
      <button className="px-4">
        <RiSendPlane2Fill className="text-3xl text-[#5D85DD]" />
      </button>
      <TextareaAutosize
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
