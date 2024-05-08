import { RiMessage3Line } from "react-icons/ri";
import { RiMessage3Fill } from "react-icons/ri";

import Pulse from "../notification/Pulse";

const MessageTabbar = ({ active, activeStyle , isUnRead }) => {

  return active !== "message" ? (
    <div className="relative">
      <RiMessage3Line className="text-[2.2rem]" />
      {isUnRead && (
        <Pulse className={"w-3 h-3 bg-orange bottom-0 left-0 shadow-none shadow-[#ff793f]"} />
      )}
    </div>
  ) : (
    <RiMessage3Fill className={`text-[2.2rem] ${activeStyle}`} />
  );
};

export default MessageTabbar;
