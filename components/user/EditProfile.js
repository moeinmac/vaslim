"use client";
import Image from "next/image";
import { useRef } from "react";
import { BsFillCameraFill } from "react-icons/bs";
import Cropper from "cropperjs";

const EditProfile = ({ profile }) => {
  const imageRef = useRef();
  const changeProfileHandler = async (event) => {
    // const file = event.target.files[0];
    const cropper = new Cropper(imageRef.current, {
      ready() {
        // this.cropper[method](argument1, , argument2, ..., argumentN);
        this.cropper.move(1, -1);

        // Allows chain composition
        this.cropper.move(1, -1).rotate(45).scale(1, -1);
      },
    });
  };

  const sendProfileHandler = async (event) => {
    const file = event.target.files[0];
    const { data, error } = await supabase.storage
      .from("profile")
      .upload(`${props.user.id}/${Math.floor(Math.random() * 1000)}.png`, file, {
        cacheControl: "3600",
        upsert: true,
      });
    dispatch(UpdateUser(props.user.id, { profile: data.Key }));
  };
  return (
    <div className="flex justify-center ">
      <label htmlFor="change" className="relative">
        <Image
          ref={imageRef}
          src={profile}
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
