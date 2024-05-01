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

const MobileTabbar = () => {
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
          <MessageTabbar active={tabbar.type} activeStyle={styles.active} />
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
