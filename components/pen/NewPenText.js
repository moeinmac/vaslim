"use client";

import { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import SubmitButton from "@/components/Auth/SubmitButton";
import sendNewPen from "@/lib/pen/sendNewPen";

const newPenStyles = {
  orange: { text: "bg-transparent border-2 border-orange", button: "bg-orange text-black" },
  blue: { text: "bg-blue", button: "bg-blue text-white" },
  bgpen: { text: "penItem_bg", button: "penItem_bg text-white" },
  stamp: { text: "stamp", button: "stamp text-white" },
  white: { text: "bg-white text-black", button: "bg-white text-black" },
  gray: { text: "bg-gray text-black", button: "bg-gray text-black" },
};

const NewPenText = () => {
  const bgItems = "w-10 h-10 rounded-lg";
  const [styles, setStyles] = useState(newPenStyles.orange);

  return (
    <>
      <div className="flex gap-4 flex-col">
        <div className="flex items-center gap-2">
          {Object.keys(newPenStyles).map((item) => (
            <div
              key={item}
              className={`${bgItems} ${newPenStyles[item].text}`}
              id={item}
              onClick={() => setStyles(newPenStyles[item])}
            ></div>
          ))}
          {/* <div className={`${bgItems} border-2 border-orange`} id="orange" ></div>
          <div className={`${bgItems} bg-blue`} id="blue"></div>
          <div className={`${bgItems} penItem_bg`} id="bgpen"></div>
          <div className={`${bgItems} stamp`} id="stamp"></div>
          <div className={`${bgItems} bg-white`} id="white"></div>
          <div className={`${bgItems} bg-gray`} id="gray"></div> */}
        </div>
        <TextareaAutosize
          name="pen"
          placeholder="هیچ آداب و ترتیبی مجو هرچه میخواهد دل تنگت بگو"
          minRows={10}
          dir="auto"
          maxRows={15}
          maxLength={1000}
          className={`${styles.text} newpen leading-8 rounded-lg resize-none outline-0 text-base font-alibaba p-4`}
        ></TextareaAutosize>
      </div>
      <SubmitButton
        formAction={sendNewPen}
        pendingText="آماده سازی چاپار..."
        className={`${styles.button} newpen text-4xl font-kalameh rounded-lg py-3`}
      >
        ارســـال نــوشته
      </SubmitButton>
    </>
  );
};

export default NewPenText;
