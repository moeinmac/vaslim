import { logoutHandler } from "@/lib/logoutHandler";
import { HiMiniEllipsisVertical } from "react-icons/hi2";

const SettingButton = ({ isLogout }) => {
  return isLogout ? (
    <form action={logoutHandler}>
      <button className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover">
        <HiMiniEllipsisVertical className=" text-orange" />
      </button>
    </form>
  ) : (
    <HiMiniEllipsisVertical className=" text-orange" />
  );
};
export default SettingButton;
