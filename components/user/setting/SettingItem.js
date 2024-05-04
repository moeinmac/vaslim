const SettingItem = ({ id, text, onClick, children }) => {
  return (
    <button className="flex items-center gap-3" id={id} onClick={()=> {onClick(id)}}>
      {children}
      <p className="font-alibaba">{text}</p>
    </button>
  );
};

export default SettingItem
