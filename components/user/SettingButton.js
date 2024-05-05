import { useState } from "react";
import { HiMiniEllipsisVertical } from "react-icons/hi2";
import MySetting from "./setting/MySetting";

const SettingButton = ({ from, me }) => {
  const [open, setOpen] = useState(false);
  const openHandler = () => setOpen(!open);

  return (
    <>
      {open && me && <MySetting onClose={openHandler} from={from} />}
      <HiMiniEllipsisVertical className=" text-orange" onClick={openHandler} />
    </>
  );
};
export default SettingButton;
