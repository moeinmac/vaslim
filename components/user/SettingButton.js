import { useState } from "react";
import { HiMiniEllipsisVertical } from "react-icons/hi2";
import MySetting from "./setting/MySetting";

const SettingButton = () => {
  const [open, setOpen] = useState(false);
  const openHandler = () => setOpen(!open);

  return (
    <>
      {open && <MySetting onClose={openHandler} />}
      <HiMiniEllipsisVertical className=" text-orange" onClick={openHandler} />
    </>
  );
};
export default SettingButton;
