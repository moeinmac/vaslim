import { useState } from "react";
import { HiMiniEllipsisVertical } from "react-icons/hi2";
import MySetting from "./setting/MySetting";
import UserSetting from "./setting/UserSetting";

const SettingButton = ({ me, user }) => {
  const [open, setOpen] = useState(false);
  const openHandler = () => setOpen(!open);

  return (
    <>
      {open && me && <MySetting onClose={openHandler} user={user} />}
      {open && !me && <UserSetting onClose={openHandler} user={user} />}
      <HiMiniEllipsisVertical className=" text-orange" onClick={openHandler} />
    </>
  );
};
export default SettingButton;
