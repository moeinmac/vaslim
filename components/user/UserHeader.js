"use client";

import Profile from "./Profile";

import BackButton from "./BackButton";
import SettingButton from "./SettingButton";
import { useState } from "react";
import Modal from "../Modal/Modal";
import Image from "next/image";

const UserHeader = ({ profile, fullname, username, isVerified, isLogout }) => {
  const [isView, setIsView] = useState(false);
  const viewProfileHandler = () => setIsView(!isView);

  return (
    <>
      {isView && (
        <Modal onClose={viewProfileHandler} className={"top-24"}>
          <Image
            width={300}
            height={300}
            src={profile}
            className="rounded-3xl mx-auto"
            alt="profile"
            // placeholder="blur"
          />
        </Modal>
      )}
      <div className="flex w-full justify-between items-start text-4xl pt-8 pl-6 pr-5">
        <SettingButton isLogout={isLogout} />
        <Profile
          profile={profile}
          fullname={fullname}
          onClick={viewProfileHandler}
          username={username}
          isVerified={isVerified}
        />
        <BackButton className={"text-orange text-4xl"} />
      </div>
    </>
  );
};

export default UserHeader;
