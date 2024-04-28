"use client";

import { createClient } from "@/lib/supabase/client";
import styles from "./BellButton.module.css";
import Link from "next/link";
import { useState, useEffect } from "react";
import { PiBellFill, PiBellLight } from "react-icons/pi";

const BellButton = ({ myid }) => {
  const supabase = createClient();

  const [isNotif, setisNotif] = useState(false);

  const getIsCheckedNotif = async () => {
    const { data } = await supabase.from("user").select("notification").eq("id", myid).single();
    if (data.notification.length !== 0) {
      setisNotif(true);
      return;
    }
    setisNotif(false);
  };

  useEffect(() => {
    getIsCheckedNotif();
  }, []);

  const handleChanges = (paylod) => {
    if (paylod.new.id === myid) {
      console.log(paylod);
      if (paylod.new.notification.length >= 1) {
        setisNotif(true);
        return;
      }

      if (paylod.new.reqIn.length === 0 || paylod.new.notification.length === 0) {
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
    <Link href={"/home/notification/"}>
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
