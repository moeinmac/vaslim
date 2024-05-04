"use client";
import { useRef } from "react";
import TextareaAutosize from "react-textarea-autosize";

import { RiSendPlane2Fill } from "react-icons/ri";

const NewMessage = ({ myid, sendMessageHandler }) => {
  const inputRef = useRef();

  const createNewMessageHandler = async () => {
    if (inputRef.current.value.trim() === "") return;
    const message = {
      text: inputRef.current.value,
      time: new Date().toISOString(),
      send_by: myid,
    };
    sendMessageHandler(message);
    inputRef.current.value = "";
  };

  return (
    <div className="fixed bottom-0 z-20 flex self-end w-full items-center py-[1.3rem] stamp rounded-tl-xl rounded-tr-xl">
      <button className="px-4" onClick={createNewMessageHandler}>
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
