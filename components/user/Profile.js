import Image from "next/image";

const Profile = ({ profile, fullname, username, small }) => {
  return (
    <div className={`flex ${small ? "" : "flex-col"} items-center gap-4`}>
      <Image
        width={small ? 60 : 100}
        height={small ? 60 : 100}
        src={profile}
        priority
        alt={fullname}
        className="rounded-lg outline-8 outline-blue outline-double "
      />
      <div className={`flex flex-col ${small ? "gap-1" : "items-center"}`}>
        <p className={`font-alibaba ${small ? "text-base" : "text-lg"}`}>{fullname}</p>
        <p className="font-alibaba text-sm">{username}@</p>
      </div>
    </div>
  );
};

export default Profile;
