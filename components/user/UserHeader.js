import Profile from "./Profile";

import BackButton from "./BackButton";
import SettingButton from "./SettingButton";

const UserHeader = ({ profile, fullname, username, path ,isVerified , isLogout}) => {
  return (
    <div className="flex w-full justify-between items-start text-4xl pt-8 pl-6 pr-5">
      <SettingButton isLogout={isLogout}/>
      <Profile profile={profile} fullname={fullname} username={username} isVerified={isVerified}/>
      <BackButton className={"text-orange text-4xl"} path={path} />
    </div>
  );
};

export default UserHeader;
