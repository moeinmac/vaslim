import { TbLoader } from "react-icons/tb";

const MessageItem = ({ message, myid, isLoading }) => {
  const me = myid === message.send_by;
  const time = new Date(message.time);
  const currentTime = `${
    time.getMinutes() <= 9 ? `0${time.getMinutes()}` : `${time.getMinutes()}`
  } : ${time.getHours() <= 9 ? `0${time.getHours()}` : `${time.getHours()}`}`;
  return (
    <div
      className={`max-w-[85vw]  px-4 py-2 rounded-xl ${
        isLoading ? "flex mt-3 items-center gap-4" : ""
      } ${
        me
          ? "bg-[#5D85DD] rounded-tr-sm rounded-br-3xl"
          : "bg-[#6e7178] rounded-bl-3xl rounded-tl-sm self-end"
      }`}
    >
      {isLoading && <TbLoader />}
      <p className={` ${me ? "order-2" : "order-0"} font-alibaba`}><span className="text-[#cfcfcf] text-xs pl-2 order-1 text-nowrap">{currentTime}</span> {message.text}</p>
    </div>
  );
};

export default MessageItem;
