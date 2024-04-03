"use client";

const Input = ({ pholder, id, bg_color, type }) => {
  return (
    <input
      dir="ltr"
      type={type}
      id={id}
      placeholder={pholder ? pholder : ""}
      className={`w-full bg-[#${bg_color}] font-alibaba text-xl outline-0 border-0 px-4 py-3 rounded-xl mt-2`}
    />
  );
};

export default Input;
