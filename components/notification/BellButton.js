"use client";

import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { useState } from "react";
import { TbBellCheck ,TbBellBolt} from "react-icons/tb";

const BellButton = ({ myUsername }) => {
  const supabase = createClient();
  const [isNotif , setisNotif] = useState();

  const handleChanges = (paylod) => {
    if (paylod.new.username === myUsername) {
      setisNotif(true);
    }
  };

  supabase
    .channel("reqUser")
    .on("postgres_changes", { event: "UPDATE", schema: "public", table: "user" }, handleChanges)
    .subscribe();
  return (
    <Link href="/home/notification/">
      {!isNotif && <TbBellCheck className="text-4xl" />}
      {isNotif && <TbBellBolt  className="text-4xl" />}
    </Link>
  );
};

export default BellButton;
