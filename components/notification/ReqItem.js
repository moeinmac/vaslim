"use client";

import Image from "next/image";
import { MdOutlineCancel } from "react-icons/md";
import removeVasl from "@/lib/removeVasl";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

const ReqItem = ({ user, me, myUsername, userUsername }) => {
  const supabase = createClient();

  const [delReqItem, setDelReqItem] = useState();

  const acseptHandler = async () => {
    await supabase
      .from("user")
      .update({ vasl: Array.from(new Set([...me.vasl, userUsername])) })
      .eq("username", myUsername);
    await supabase
      .from("user")
      .update({ vasl: Array.from(new Set([...user.vasl, myUsername])) })
      .eq("username", userUsername);

    await supabase
      .from("user")
      .update({ reqOut: removeVasl(user.reqOut, myUsername) })
      .eq("username", userUsername);
    await supabase
      .from("user")
      .update({ reqIn: removeVasl(me.reqIn, userUsername) })
      .eq("username", myUsername);
    setDelReqItem(true);
  };

  const denyHandler = async () => {
    await supabase
      .from("user")
      .update({ reqOut: removeVasl(user.reqOut, myUsername) })
      .eq("username", userUsername);
    await supabase
      .from("user")
      .update({ reqIn: removeVasl(me.reqIn, userUsername) })
      .eq("username", myUsername);
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
            onClick={acseptHandler}>
            وصـــل شیم
          </button>
          <button onClick={denyHandler}>
            <MdOutlineCancel className="text-red-600 text-2xl" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReqItem;
