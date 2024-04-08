"use client";

import { createClient } from "@/lib/supabase/client";
import { useState } from "react";

const MyAccount = ({ meData }) => {
  const [me, setMe] = useState(meData);
  const supabase = createClient();

  const handleChanges = (paylod) => {
    if (paylod.new.username === me.username) {
      setMe(paylod.new);
    }
  };

  supabase
    .channel("updateVaslUser")
    .on("postgres_changes", { event: "UPDATE", schema: "public", table: "user" }, handleChanges)
    .subscribe();

  return (
    <div className="flex items-center gap-8  w-full px-8 py-4">
      <p className="font-kalameh text-3xl flex flex-col">
        <span className="text-center">{me.vasl ? me.vasl.length : 0}</span>
        <span className="font-alibaba text-base">متصل</span>
      </p>
      <button className="bg-blue py-2 w-full text-4xl font-kalameh rounded-xl">
        ویرایش صــفحه
      </button>
    </div>
  );
};

export default MyAccount;
