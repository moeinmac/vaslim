"use client";
// import { createClient } from "@/lib/supabase/client";
// import { useRef } from "react";

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
    <div className="flex self-end w-full items-center px-2 gap-2">
      <button className="bg-slate-900 p-4 rounded-lg">
        <RiSendPlane2Line className="text-3xl" />
      </button>
      <input
        type="text"
        className="bg-transparent outline-0 w-full bg-slate-900 text-lg font-alibaba px-6 py-4 rounded-lg"
        dir="auto"
        placeholder="یه چیزی بگــو..."
      />
    </div>
  );
};

export default NewMessage;
