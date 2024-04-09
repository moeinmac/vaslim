"use client";

import { createClient } from "@/lib/supabase/client";
import Image from "next/image";
import { MdOutlineCancel } from "react-icons/md";
import removeVasl from "@/lib/removeVasl";
import { useState } from "react";

const ReqItem = async ({ userUsername, myUsername }) => {
  const supabase = createClient();
  const meRes = await supabase.from("user").select().eq("username", myUsername);
  const userRes = await supabase.from("user").select().eq("username", userUsername);
  const me = meRes.data[0];
  const user = userRes.data[0];

  // const [isDel, setIsDel] = useState(false);

  const acseptReqHandler = async () => {
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

    setIsDel(true);
  };

  const denyReqHandler = async () => {
    await supabase
      .from("user")
      .update({ reqOut: removeVasl(user.reqOut, myUsername) })
      .eq("username", userUsername);
    await supabase
      .from("user")
      .update({ reqIn: removeVasl(me.reqIn, userUsername) })
      .eq("username", myUsername);

    setIsDel(true);
  };
  // if (isDel) return;
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
            onClick={acseptReqHandler}
          >
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
