const MessageItem = ({ message, myid }) => {
  const me = myid === message.send_by;
  return (
    <div
      className={`flex ${
        me ? "bg-[#5D85DD] rounded-tr-none" : "bg-[#6e7178] rounded-tl-none self-end"
      } items-center gap-4 px-4 py-2 rounded-2xl `}
    >
      <span className="text-[#cfcfcf] text-xs pt-1 order-1">{message.time}</span>
      <p className={`${me ? "order-2" : "order-0"} font-alibaba`}>{message.text}</p>
    </div>
  );
};

export default MessageItem;
