"use client";

import { createClient } from "@/lib/supabase/client";
import { useState } from "react";
import VaslButton from "./VaslButton";
import Link from "next/link";

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
      <VaslButton vasl={me.vasl ? me.vasl.length : 0} />
      <Link
        href={"/user/edit"}
        className="text-center bg-blue py-2 w-full text-4xl font-kalameh rounded-xl">
        ویرایش صــفحه
      </Link>
    </div>
  );
};

export default MyAccount;
