"use client";
import Image from "next/image";
import { BsFillCameraFill } from "react-icons/bs";
import Compressor from "compressorjs";
import { createClient } from "@/lib/supabase/client";

const EditProfile = ({ profile }) => {
  const changeProfileHandler = async (event) => {
    const file = event.target.files[0];
    const supabase = createClient();
    const { data, error } = await supabase.storage
      .from("profile")
      .upload(`hhhhhh/${Math.floor(Math.random() * 1000)}.jpg`, file, {
        cacheControl: "3600",
        upsert: true,
      });
    console.log({ data, error });
    // const file = event.target.files[0];
    // new Compressor(event.target.files[0], {
    //   quality: 0.5,
    //   success(result) {
    //     sendProfileHandler(result);
    //   },
    // });
  };

  const sendProfileHandler = async (event) => {
    const supabase = createClient();
    const file = event.target.files[0];
    const { data, error } = await supabase.storage.from("profile").upload(`test/1.png`, file, {
      contentType: "image/jpeg",
      cacheControl: "3600",
      upsert: true,
    });
    console.log(data);
  };
  return (
    <div className="flex justify-center ">
      <label htmlFor="change" className="relative">
        <Image
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
        onChange={sendProfileHandler}
        type="file"
        id="change"
        accept="image/*"
      />
    </div>
  );
};

export default EditProfile;
