import Modal from "../../Modal/Modal";
import { CgUserList } from "react-icons/cg";
import { TbPasswordUser, TbUserShield } from "react-icons/tb";
import { BiSupport } from "react-icons/bi";
import { VscSignOut } from "react-icons/vsc";
import SettingItem from "./SettingItem";
import { MdArrowBackIosNew } from "react-icons/md";
import { useReducer } from "react";
import AccountData from "./AccountData";
import ChangePassowrd from "./ChangePassword";
import ChangePrivacy from "./ChangePrivacy";
import ReportProblem from "./ReportProblem";

const settingItemData = [
  { id: "info", text: "اطلاعات حساب کــاربری", icon: <CgUserList /> },
  { id: "password", text: "تغییر گذرواژه", icon: <TbPasswordUser /> },
  { id: "privacy", text: "ویرایش حریم شخصی", icon: <TbUserShield /> },
  { id: "report", text: "گزارش مشکل به پشتیبانی", icon: <BiSupport /> },
  { id: "signout", text: "خروج از حساب وصلیم", icon: <VscSignOut /> },
];

const settingReducer = (state, action) => {
  if (action.type == "info") {
    return {
      info: true,
      password: false,
      privacy: false,
      report: false,
      signout: false,
      back: true,
    };
  }
  if (action.type == "password") {
    return {
      info: false,
      password: true,
      privacy: false,
      report: false,
      signout: false,
      back: true,
    };
  }
  if (action.type == "privacy") {
    return {
      info: false,
      password: false,
      privacy: true,
      report: false,
      signout: false,
      back: true,
    };
  }
  if (action.type == "report") {
    return {
      info: false,
      password: false,
      privacy: false,
      report: true,
      signout: false,
      back: true,
    };
  }
  if (action.type == "signout") {
    return {
      info: false,
      password: false,
      privacy: false,
      report: false,
      signout: true,
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

const MySetting = ({ onClose }) => {
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
        <h2 className="font-kalameh text-4xl">تنظیــمات حــساب</h2>
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
      {setting.info && <AccountData />}
      {setting.password && <ChangePassowrd />}
      {setting.privacy && <ChangePrivacy />}
    </Modal>
  );
};

export default MySetting;
