const MessageItem = ({ message, myid }) => {
  const me = myid === message.send_by;
  const time = new Date(message.time);
  return (
    <div
      className={`flex ${
        me ? "bg-[#5D85DD] rounded-tr-sm" : "bg-[#6e7178] rounded-tl-sm self-end"
      } items-center gap-4 px-4 py-2 rounded-2xl `}
    >
      <span className="text-[#cfcfcf] text-xs pt-1 order-1">{`${time.getMinutes()} : ${time.getHours()}`}</span>
      <p className={`${me ? "order-2" : "order-0"} font-alibaba`}>{message.text}</p>
    </div>
  );
};

export default MessageItem;
