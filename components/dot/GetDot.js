"use client";
import Image from "next/image";
import { CiCirclePlus } from "react-icons/ci";

const DotItem = ({ profile, username, isActive }) => {
  return (
    <div className={` flex flex-col items-center gap-1`}>
      <div className="relative w-14 h-14">
        <Image
          src={profile}
          alt={username}
          width={56}
          height={56}
          className={`${isActive ? "border-2 border-orange" : ""} rounded-xl`}
        />
      </div>
      <p className="font-alibaba text-[0.7rem]">{username}@</p>
    </div>
  );
};

const GetDot = ({ dotData, myProfile, isBlur }) => {
  return (
    <div className="flex items-center gap-4 overflow-hidden px-6 relative">
      <div
        className={`w-full h-full  absolute top-0 left-0 z-20 ${
          isBlur ? "backdrop-blur-sm" : "back-drop"
        } text-center rounded-lg`}
      >
        <h1 className={`font-kalameh text-2xl mt-5 ${isBlur ? "opacity-100" : "show"}`}>
          بخش نقطه هنوز در درست توسعه میباشد
        </h1>
      </div>
      <div className="flex flex-col items-center gap-1">
        <div className="relative w-14 h-14">
          <Image
            src={myProfile}
            alt={"نقطه شما"}
            width={56}
            height={56}
            className="rounded-xl"
          />
          <CiCirclePlus className="absolute z-10 text-xl bg-orange rounded-full -bottom-1 -right-2" />
        </div>
        <p className="font-alibaba text-[0.7rem]">{"نقطه شما"}</p>
      </div>
      {dotData.map((item) => (
        <DotItem
          key={item.username}
          username={item.username}
          profile={item.profile}
          isActive={item.isActive}
        />
      ))}
    </div>
  );
};

export default GetDot;
