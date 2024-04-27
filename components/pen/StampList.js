"use client";

import { getUsersByPrimary } from "@/lib/getUsersByPrimary";
import UserItem from "../user/UserItem";
import { useEffect, useState } from "react";

const StampList = ({ stamp }) => {
  const [stamplistdata, setStamplistdata] = useState([]);
  useEffect(() => {
    const fetchdata = async () => {
      const userdata = await getUsersByPrimary(stamp, true, [
        "profile",
        "username",
        "isVerified",
        "fullname",
      ]);
      setStamplistdata(userdata)
    };
    fetchdata()
  }, []);

  return (
    <div className="mx-3 flex flex-col penItem_bg p-2 mb-[8rem] bg-black rounded-bl-lg rounded-br-lg">
      <h1 className="font-kalameh text-3xl bg-black pt-3 px-4 rounded-tl-lg rounded-tr-lg">
        لیست مُهر کـــننده ها :{" "}
      </h1>
      <div className="bg-black rounded-bl-lg rounded-br-lg py-2">
        {stamplistdata.map((data) => (
          <UserItem data={data} key={data.username} path={data.username} small />
        ))}
      </div>
    </div>
  );
};

export default StampList;
