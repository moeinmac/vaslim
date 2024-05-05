import Modal from "../../Modal/Modal";

import SettingItem from "./SettingItem";
import { RiUserSharedLine } from "react-icons/ri";
import { MdArrowBackIosNew } from "react-icons/md";
import { RiUserVoiceLine } from "react-icons/ri";
import { BiBlock } from "react-icons/bi";
import { GiBleedingEye } from "react-icons/gi";
import { useReducer } from "react";

import ShareAccount from "./ShareAccount";
import ReportUser from "./ReportUser";
import BlockUser from "./BlockUser";
import HideDot from "./HideDot";


const settingItemData = [
  { id: "share", text: "به اشتراک گذاشتن این کــاربر", icon: <RiUserSharedLine /> },
  { id: "report", text: "گزارش کردن", icon: <RiUserVoiceLine /> },
  { id: "block", text: "مسدود کردن", icon: <BiBlock /> },
  { id: "hide", text: "مخفی کردن نقطه از این کــاربر", icon: <GiBleedingEye /> },
];

const settingReducer = (state, action) => {
  if (action.type == "share") {
    return {
      share: true,
      report: false,
      block: false,
      hide: false,
      back: true,
    };
  }
  if (action.type == "report") {
    return {
      share: false,
      report: true,
      block: false,
      hide: false,
      back: true,
    };
  }
  if (action.type == "block") {
    return {
      share: false,
      report: false,
      block: true,
      hide: false,
      back: true,
    };
  }
  if (action.type == "hide") {
    return {
      share: false,
      report: false,
      block: false,
      hide: true,
      back: true,
    };
  }
  return {
    back: false,
  };
};

const initState = {
  back: false,
};

const UserSetting = ({ onClose , user }) => {
  const [setting, dispatchSetting] = useReducer(settingReducer, initState);
  const clickItemHandler = (id) => dispatchSetting({ type: id });
  return (
    <Modal
      onClose={onClose}
      className={
        "bg-slate-800 py-8 w-[100%] bottom-0 right-0 rounded-t-xl flex flex-col gap-5 text-xl"
      }
    >
      <div
        className={`${setting.back ? "justify-between" : "justify-center"} flex items-center  my-2`}
      >
        <h2 className="font-kalameh text-4xl">اطلاعات بیشــتر</h2>
        {setting.back && <MdArrowBackIosNew onClick={() => dispatchSetting({ type: "back" })} />}
      </div>
      {!setting.back && (
        <div className="flex flex-col gap-6 my-4">
          {settingItemData.map((item) => (
            <SettingItem key={item.id} id={item.id} text={item.text} onClick={clickItemHandler}>
              {item.icon}
            </SettingItem>
          ))}
        </div>
      )}
      {setting.share && <ShareAccount user={user} />}
      {setting.report && <ReportUser user={user} closeReport={onClose}/>}
      {setting.block && <BlockUser reportUser={() => clickItemHandler("report")} />}
      {setting.hide && <HideDot  />}

    </Modal>
  );
};

export default UserSetting;
