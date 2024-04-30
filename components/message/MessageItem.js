import { TbLoader } from "react-icons/tb";

const MessageItem = ({ message, myid ,isLoading}) => {
  const me = myid === message.send_by;
  const time = new Date(message.time);
  return (
    <div
      className={`max-w-[80vw] ${isLoading ? "flex-grow-0 flex ml-auto mr-4 mt-3" : "flex"} ${
        me ? "bg-[#5D85DD] rounded-tr-sm rounded-br-3xl" : "bg-[#6e7178] rounded-bl-3xl rounded-tl-sm self-end"
      } items-center gap-4 px-4 py-2 rounded-xl `}
    >
      {isLoading && <TbLoader />}
      <span className="text-[#cfcfcf] text-xs pt-1 order-1">{`${time.getMinutes()} : ${time.getHours()}`}</span>
      <p className={` ${me ? "order-2" : "order-0"} font-alibaba`}>{message.text}</p>
    </div>
  );
};

export default MessageItem;
