"use client";

import Image from "next/image";
import { BsFillCameraFill } from "react-icons/bs";
import { useState } from "react";
import ImageCropper from "./ImageCropper";

const EditProfile = ({ profile, id }) => {
  const [updatedProfile, setProfile] = useState(profile);
  const [isChangeProfile, setIsChanageProfile] = useState();

  const onChangeProfile = (value) => setIsChanageProfile(value);
  const onSetProfile = (value) => setProfile(value) 
  return (
    <div className="flex justify-center ">
      {!isChangeProfile && (
        <label htmlFor="change" className="relative">
          <Image
            src={updatedProfile}
            width={100}
            height={100}

            alt={"edit profile"}
            className="rounded-lg"
          />
          <BsFillCameraFill className="-bottom-4 -right-3 absolute text-4xl p-2 bg-black rounded-full" />
        </label>
      )}
      <ImageCropper id={id} onSetProfile={onSetProfile} isChangeProfile={isChangeProfile} onChangeProfile={onChangeProfile} />
    </div>
  );
};

export default EditProfile;
