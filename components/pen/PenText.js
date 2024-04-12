"use client";

const { useState, useRef } = require("react");

const Line = () => {
  return <div className="bg-orange w-full h-[1px]"></div>;
};

const PenText = ({ isLine }) => {
  const [newLine, setNewLine] = useState({ lines: [] });
  const textRef = useRef();

  const changeNewLineHandler = (event) => {
    const lines = event.target.value.split("\n");
    if (lines.length !== newLine.lines.length) {
      setNewLine({ lines });
    }
  };

  const changeFocusHandler = () => {
    textRef.current.focus();
  };

  return (
    <div className="relative">
      {isLine && (
        <div
          className="flex flex-col gap-8 px-4 absolute top-[46px] w-full"
          onClick={changeFocusHandler}
        >
          {newLine.lines.map(() => (
            <Line key={Math.random()} />
          ))}
        </div>
      )}
      <textarea
        name="pen"
        ref={textRef}
        onChange={changeNewLineHandler}
        className="z-10 relative text-lg rounded-lg leading-8 p-4 font-alibaba resize-none w-full h-72  overflow-auto border-4 bg-transparent border-orange focus:outline-0"
        placeholder="هیچ آدابی و ترتیبی مـجو هرچه می‌خواهد دل تنگت بگــو"
      ></textarea>
    </div>
  );
};

export default PenText;
