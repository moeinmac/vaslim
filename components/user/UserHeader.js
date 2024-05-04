"use client";

import Profile from "./Profile";

import BackButton from "./BackButton";
import SettingButton from "./SettingButton";
import { useState } from "react";
import Modal from "../Modal/Modal";
import ViewProfile from "./ViewProfile";

const UserHeader = ({ profile, fullname, username, isVerified }) => {
  const [isView, setIsView] = useState(false);
  const viewProfileHandler = () => setIsView(!isView);

  return (
    <>
      {isView && (
        <Modal onClose={viewProfileHandler} className={"top-24 w-[90%] left-[5%] rounded-xl"}>
          <ViewProfile src={profile} width={300} height={300} className={"rounded-3xl mx-auto"} />
        </Modal>
      )}
      <div className="flex w-full justify-between items-start text-4xl pt-8 pl-6 pr-5">
        <SettingButton />
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
