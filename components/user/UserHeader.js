import Profile from "./Profile";
import { IoReturnUpBackSharp } from "react-icons/io5";
import { HiMiniEllipsisVertical } from "react-icons/hi2";
import Link from "next/link";

const UserHeader = ({ profile, fullname, username }) => {
  return (
    <div className="flex w-full justify-between items-start text-4xl pt-8 pl-6 pr-5">
      <HiMiniEllipsisVertical className=" text-orange" />
      <Profile profile={profile} fullname={fullname} username={username} />
      <Link href="/home"><IoReturnUpBackSharp className=" text-orange" /></Link>
    </div>
  );
};

export default UserHeader;
