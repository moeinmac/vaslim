"use client";

import { createClient } from "@/lib/supabase/client";
import styles from "./BellButton.module.css";
import Link from "next/link";
import { useState, useEffect } from "react";
import { PiBellFill, PiBellLight } from "react-icons/pi";

const BellButton = ({ myUsername }) => {
  const supabase = createClient();

  const [isNotif, setisNotif] = useState(false);

  const getIsCheckedNotif = async (username) => {
    const { data } = await supabase.from("user").select("notification").eq("username", username);
    if (!data[0].notification["isChecked"]) {
      setisNotif(true);
      return;
    }
    setisNotif(false);
  };

  console.log({ isNotif });

  useEffect(() => {
    getIsCheckedNotif(myUsername);
  }, []);

  const handleChanges = (paylod) => {
    if (paylod.new.username === myUsername) {
      if (!paylod.new.notification["isChecked"]) {
        setisNotif(true);
        return;
      }

      if (paylod.new.reqIn.length === 0 || paylod.new.notification["isChecked"]) {
        setisNotif(false);
        return;
      }
    }
  };
  supabase
    .channel("notification")
    .on("postgres_changes", { event: "UPDATE", schema: "public", table: "user" }, handleChanges)
    .subscribe();
  return (
    <Link href="/home/notification/">
      {!isNotif && <PiBellFill className="text-4xl" />}
      {isNotif && (
        <div className="relative">
          <div className={styles.blob}></div>
          <PiBellLight className="text-4xl" />
        </div>
      )}
    </Link>
  );
};

export default BellButton;
