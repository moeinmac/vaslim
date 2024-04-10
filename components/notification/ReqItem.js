"use client";

import Image from "next/image";
import { MdOutlineCancel } from "react-icons/md";

import { useState } from "react";
import { acceptHandler } from "@/lib/req/acceptHandler";
import { denyHandler } from "@/lib/req/denyHandler";

const ReqItem = ({ user, me }) => {
  const [delReqItem, setDelReqItem] = useState();

  const acceptReqHandler = async () => {
    acceptHandler(user, me);
    setDelReqItem(true);
  };

  const denyReqHandler = async () => {
    denyHandler(user, me);
    setDelReqItem(true);
  };

  if (delReqItem) return;
  return (
    <div className="bg-orange p-2 rounded-lg flex items-center gap-2">
      <Image src={user.profile} alt={user.fullname} width={60} height={60} className="rounded-xl" />
      <div className="flex w-full text-black font-alibaba items-center justify-between">
        <div>
          <p className="">{user.fullname}</p>
          <p className="text-sm">{user.username}@</p>
        </div>
        <div className="flex gap-3 items-center">
          <button
            className="bg-gray text-black py-1 px-2 w-full text-2xl font-kalameh rounded-lg"
            onClick={acceptReqHandler}>
            وصـــل شیم
          </button>
          <button onClick={denyReqHandler}>
            <MdOutlineCancel className="text-red-600 text-2xl" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReqItem;
