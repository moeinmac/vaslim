import Image from "next/image";
import VerifiedButton from "./VerfiedButton";

const Profile = ({ profile, fullname, username, small, isVerified, className }) => {
  return (
    <div className={`flex ${small ? "" : "flex-col"} items-center gap-4`}>
      <Image
        width={small ? 60 : 100}
        height={small ? 60 : 100}
        src={profile}
        alt={fullname}
        className="rounded-lg outline-8 outline-blue outline-double "
      />
      <div className={`flex flex-col ${small ? "gap-1" : "items-center"}`}>
        <p className={`font-alibaba ${small ? "text-base" : "text-lg"}`}>{fullname}</p>
        <VerifiedButton isVerified={isVerified} username={username} className={"text-lg"} />
      </div>
    </div>
  );
};

export default Profile;
