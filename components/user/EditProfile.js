"use client";

import Image from "next/image";
import { BsFillCameraFill } from "react-icons/bs";
import { sendProfileHandler } from "@/lib/sendProfileHandler";
import { useState } from "react";

const EditProfile = ({ profile, id }) => {
  const [updatedProfile, setProfile] = useState(profile);
  const changeProfileHandler = async (event) => {
    const file = event.target.files[0];
    const res = sendProfileHandler(file, id);
    res.then((url) => setProfile(url));
  };

  return (
    <div className="flex justify-center ">
      <label htmlFor="change" className="relative">
        <Image
          src={updatedProfile}
          width={100}
          height={100}
          priority
          alt={"edit profile"}
          className="rounded-lg"
        />
        <BsFillCameraFill className="-bottom-4 -right-4 absolute text-4xl p-2 bg-black rounded-full" />
      </label>
      <input
        className="hidden"
        onChange={changeProfileHandler}
        type="file"
        id="change"
        accept="image/*"
      />
    </div>
  );
};

export default EditProfile;
