import Profile from "./Profile";
import { HiMiniEllipsisVertical } from "react-icons/hi2";
import BackButton from "./BackButton";

const UserHeader = ({ profile, fullname, username, path }) => {
  return (
    <div className="flex w-full justify-between items-start text-4xl pt-8 pl-6 pr-5">
      <HiMiniEllipsisVertical className=" text-orange" />
      <Profile profile={profile} fullname={fullname} username={username} />
      <BackButton className={"text-orange text-4xl"} path={path} />
    </div>
  );
};

export default UserHeader;
