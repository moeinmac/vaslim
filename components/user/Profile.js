import Image from "next/image";

const Profile = ({ profile, fullname, username }) => {
  return (
    <div className="flex flex-col items-center gap-4">
      <Image
        width={100}
        height={100}
        src={profile}
        priority
        alt={fullname}
        className="rounded-lg outline-8 outline-blue outline-double "
      />
      <div className="flex flex-col items-center">
        <p className="font-alibaba text-lg">{fullname}</p>
        <p className="font-alibaba text-sm">{username}@</p>
      </div>
    </div>
  );
};

export default Profile;
