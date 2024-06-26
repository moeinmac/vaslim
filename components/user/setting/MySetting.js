import Modal from "../../Modal/Modal";
import { CgUserList } from "react-icons/cg";
import { TbPasswordUser, TbUserShield } from "react-icons/tb";
import { BiSupport } from "react-icons/bi";
import { VscSignOut } from "react-icons/vsc";
import SettingItem from "./SettingItem";
import { MdArrowBackIosNew } from "react-icons/md";
import { RiUserSharedLine } from "react-icons/ri";
import { GrInfo } from "react-icons/gr";
import { useReducer } from "react";
import AccountData from "./AccountData";
import ChangePassowrd from "./ChangePassword";
import ChangePrivacy from "./ChangePrivacy";
import ReportProblem from "./ReportProblem";
import Signout from "./Signout";
import ShareAccount from "./ShareAccount";
import About from "./About";

const settingItemData = [
  { id: "info", text: "اطلاعات حساب کــاربری", icon: <CgUserList /> },
  { id: "report", text: "گزارش مشکل به پشتیبانی", icon: <BiSupport /> },
  { id: "share", text: "به اشتراک گذاشتن پروفایل", icon: <RiUserSharedLine /> },
  { id: "password", text: "تغییر گذرواژه", icon: <TbPasswordUser /> },
  { id: "privacy", text: "ویرایش حریم شخصی", icon: <TbUserShield /> },
  { id: "about", text: "درباره وصــلیم", icon: <GrInfo /> },
  { id: "signout", text: "خروج از حساب وصلیم", icon: <VscSignOut /> },
];

const settingReducer = (state, action) => {
  if (action.type == "info") {
    return {
      info: true,
      back: true,
    };
  }
  if (action.type == "password") {
    return {
      password: true,
      back: true,
    };
  }
  if (action.type == "privacy") {
    return {

      privacy: true,
      back: true,
    };
  }
  if (action.type == "report") {
    return {
      report: true,
      back: true,
    };
  }
  if (action.type == "signout") {
    return {
      signout: true,
      back: true,
    };
  }
  if (action.type == "share") {
    return {
      share: true,
      back: true,
    };
  }
  if (action.type == "about") {
    return {
      about: true,
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

const MySetting = ({ onClose, user }) => {
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
      {setting.report && <ReportProblem closeReport={onClose} />}
      {setting.password && <ChangePassowrd />}
      {setting.privacy && <ChangePrivacy />}
      {setting.signout && <Signout />}
      {setting.about && <About />}
      {setting.share && <ShareAccount user={user} />}
    </Modal>
  );
};

export default MySetting;
