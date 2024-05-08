"use client";

import styles from "./MobileTabbar.module.css";
import { usePathname } from "next/navigation";

import { useEffect, useRef, useState } from "react";
import { GoHome } from "react-icons/go";
import { GoHomeFill } from "react-icons/go";

import { MdOutlinePersonSearch } from "react-icons/md";
import { MdPersonSearch } from "react-icons/md";

import { RiUser3Line } from "react-icons/ri";
import { RiUser3Fill } from "react-icons/ri";

import { TbPencil } from "react-icons/tb";
import { BiSolidPencil } from "react-icons/bi";
import Link from "next/link";
import MessageTabbar from "./MessageTabbar";
import { createClient } from "@/lib/supabase/client";

const MobileTabbar = ({ myid }) => {
  const supabase = createClient();

  const getUserMessages = async () => {
    const { data } = await supabase.from("user").select("message").eq("id", myid).single();
    return data.message;
  };

  const getIsUnreadMessage = (messages) => {
    let unread;
    messages.forEach((messageItem) => {
      if (messageItem.hasOwnProperty("unread") && messageItem.unread >= 1) unread = true;
    });
    return unread;
  };

  const [isUnRead, setIsUnRead] = useState(false);

  useEffect(() => {
    const fetchMessageUser = async () => {
      const messages = await getUserMessages();
      setIsUnRead(getIsUnreadMessage(messages));
    };
    if (myid) fetchMessageUser();
  }, [myid]);

  const handleChanges = (paylod) => {
    if (paylod.new.id === myid) setIsUnRead(getIsUnreadMessage(paylod.new.message));
  };
  supabase
    .channel("updateUser")
    .on("postgres_changes", { event: "UPDATE", schema: "public", table: "user" }, handleChanges)
    .subscribe();

  const path = usePathname();

  const homeRef = useRef();
  const searchRef = useRef();
  const penRef = useRef();
  const messageRef = useRef();
  const userRef = useRef();

  const [tabbar, setTabbar] = useState({ type: "home", left: "" });

  useEffect(() => {
    if (path.startsWith("/home")) {
      setTabbar({ type: "home", left: homeRef.current.getBoundingClientRect().left });
    } else if (path.startsWith("/search")) {
      setTabbar({ type: "search", left: searchRef.current.getBoundingClientRect().left });
    } else if (path.startsWith("/pen")) {
      setTabbar({ type: "pen", left: penRef.current.getBoundingClientRect().left });
    } else if (path.startsWith("/message")) {
      setTabbar({ type: "message", left: messageRef.current.getBoundingClientRect().left });
      setIsUnRead(false);
    } else if (path.startsWith("/user")) {
      setTabbar({ type: "user", left: userRef.current.getBoundingClientRect().left });
    } else {
      setTabbar({ type: "search", left: searchRef.current.getBoundingClientRect().left });
    }
  }, [path]);

  return (
    <nav className={styles.tabbar}>
      <ul>
        <Link href={"/home"} ref={homeRef}>
          {tabbar.type !== "home" && <GoHome className={styles.icon} />}
          {tabbar.type === "home" && <GoHomeFill className={`${styles.icon} ${styles.active}`} />}
        </Link>
        <Link href={"/search"} ref={searchRef}>
          {tabbar.type !== "search" && <MdOutlinePersonSearch className={styles.icon} />}
          {tabbar.type === "search" && (
            <MdPersonSearch className={`${styles.icon} ${styles.active}`} />
          )}
        </Link>
        <Link href={"/pen/new"} ref={penRef}>
          {tabbar.type !== "pen" && <TbPencil className={styles.icon} />}
          {tabbar.type === "pen" && <BiSolidPencil className={`${styles.icon} ${styles.active}`} />}
        </Link>
        <Link href={"/message"} ref={messageRef}>
          <MessageTabbar active={tabbar.type} activeStyle={styles.active} isUnRead={isUnRead} />
        </Link>
        <Link href={"/user"} ref={userRef}>
          {tabbar.type !== "user" && <RiUser3Line className={styles.icon} />}
          {tabbar.type === "user" && <RiUser3Fill className={`${styles.icon} ${styles.active}`} />}
        </Link>
      </ul>
      <div className={styles.tubelight} style={{ left: `${tabbar.left + 36}px` }}>
        <div className={styles["light-ray"]}></div>
      </div>
    </nav>
  );
};

export default MobileTabbar;
