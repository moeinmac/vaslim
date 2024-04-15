"use client";

import Image from "next/image";
import { BsFillCameraFill } from "react-icons/bs";
import { sendProfileHandler } from "@/lib/sendProfileHandler";
import { useState } from "react";

const EditProfile = ({ profile, id }) => {
  const [updatedProfile, setProfile] = useState(profile);
  const [isChangeProfile, setIsChanageProfile] = useState();

  // const changeProfileHandler = async (event) => {
  //   const file = event.target.files[0];
  //   const res = sendProfileHandler(file, id);
  //   res.then((url) => setProfile(url));
  // };
  return (
    <div className="flex justify-center ">
      {!isChangeProfile && (
        <label htmlFor="change" className="relative">
          <Image
            src={updatedProfile}
            width={100}
            height={100}
            priority
            alt={"edit profile"}
            className="rounded-lg"
          />
          <BsFillCameraFill className="-bottom-4 -right-3 absolute text-4xl p-2 bg-black rounded-full" />
        </label>
      )}
      <input
        className="hidden"
        // onChange={changeProfileHandler}
        type="file"
        id="change"
        accept="image/*"
      />
      {isChangeProfile && <div></div>}
    </div>
  );
};

export default EditProfile;
