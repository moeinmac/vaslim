"use client";

import { useState } from "react";
import PenText from "./PenText";
import SwitchButton from "./SwitchButton";
import { AiOutlineEnter } from "react-icons/ai";

const NewText = () => {
  const [isLine, setIsLine] = useState(true);
  const [howIs, setHowIs] = useState(false);

  const switchHandler = (checked) => {
    setIsLine(checked);
  };

  const howisHandler = () => setHowIs(!howIs);

  return (
    <div className="flex gap-4 flex-col">
      <div className="flex justify-between items-center">
        <p className="font-alibaba">
          خطوط نوشتن
          <span className="font-alibaba text-orange cursor-pointer select-none" onClick={howisHandler}>
            (چطوریه؟)
          </span>
        </p>
        <SwitchButton onSwitch={switchHandler} />
      </div>
      {howIs && (
        <p className="flex items-center font-alibaba flex-wrap gap-1 text-sm">
          با زدن دکمه enter <AiOutlineEnter /> میتوانید وارد خط بعدی شوید
        </p>
      )}
      <PenText isLine={isLine} />
    </div>
  );
};

export default NewText;
