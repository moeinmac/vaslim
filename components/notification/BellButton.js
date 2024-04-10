"use client";

import { createClient } from "@/lib/supabase/client";
import styles from "./BellButton.module.css";
import Link from "next/link";
import { useState, useEffect } from "react";
import { HiMiniBell, HiMiniBellAlert } from "react-icons/hi2";
import { getReqData } from "@/lib/req/getReqData";

const BellButton = ({ myUsername }) => {
  const supabase = createClient();

  const [isNotif, setisNotif] = useState();
  const [reqData, setReqData] = useState([]);

  useEffect(() => {
    const data = getReqData();
    setReqData(data);
  }, []);

  const handleChanges = (paylod) => {
    if (paylod.new.username === myUsername) {
      if (paylod.new.reqIn.length > reqData.length) {
        setReqData(paylod.new.reqIn);
        setisNotif(true);
        return;
      }
      if (paylod.new.reqIn.length === 0) {
        setReqData(paylod.new.reqIn);
        setisNotif(false);
        return;
      }
    }
  };
  supabase
    .channel("reqUser")
    .on("postgres_changes", { event: "UPDATE", schema: "public", table: "user" }, handleChanges)
    .subscribe();
  return (
    <Link href="/home/notification/">
      {!isNotif && <HiMiniBell className="text-4xl" />}
      {isNotif && (
        <div className="flex items-center">
          <div className={styles.blob}></div>
          <HiMiniBellAlert className="text-4xl" />
        </div>
      )}
    </Link>
  );
};

export default BellButton;
