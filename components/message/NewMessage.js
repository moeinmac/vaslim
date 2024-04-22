"use client";
import { createClient } from "@/lib/supabase/client";
import { useRef } from "react";

const NewMessage = () => {
  const supabase = createClient();
  const newChannel = supabase.channel("test-room");

  const inputRef = useRef();

  const sendMessage = () => {
    newChannel.send({
      type: "broadcast",
      event: "message",
      payload: { message: inputRef.current.value },
    });
    supabase.removeChannel(newChannel);
  };

  return (
    <div>
      <input type="text" className="text-black" ref={inputRef} />
      <button className="bg-orange" onClick={sendMessage}>
        send
      </button>
    </div>
  );
};

export default NewMessage;
