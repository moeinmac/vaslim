"use client"

const Input = ({ pholder, id, type }) => {
  return (
    <input
      required
      dir="ltr"
      type={type}
      id={id}
      placeholder={pholder ? pholder : ""}
      className={`w-full bg-gray text-black font-alibaba text-xl outline-0 border-0 px-4 py-3 rounded-xl mt-2`}
    />
  );
};

export default Input;
