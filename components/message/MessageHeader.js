"use client";
import useOnline from "@/lib/message/useOnline";
import BackButton from "../user/BackButton";
import Profile from "../user/Profile";
import { IoReturnUpBackSharp } from "react-icons/io5";
import { useRouter } from "next/navigation";

const MessageHeader = ({ data, id, userid, myid }) => {
  const {isOnline,untrackHandler} = useOnline(id, myid, userid);
  const router = useRouter();
  const backHandler = () => {
    untrackHandler();
    router.back();
  };

  return (
    <header className="fixed top-0 bg-black w-full px-6 py-4 flex items-center justify-between border-b-2 border-zinc-900">
      <div className="relative">
        <Profile
          profile={data.profile}
          fullname={data.fullname}
          username={data.username}
          isVerified={data.isVerified}
          small={true}
        />
        {isOnline && (
          <div className="absolute -bottom-2 -right-2 bg-green-500 w-5 h-5 rounded-full"></div>
        )}
      </div>
      {/* <BackButton className={"text-4xl"} />
       */}
      <IoReturnUpBackSharp className="text-4xl" onClick={backHandler} />
    </header>
  );
};

export default MessageHeader;
