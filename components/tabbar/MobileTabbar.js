"use client";

import styles from "./MobileTabbar.module.css";
import { useRouter, usePathname } from "next/navigation";

import { useEffect, useReducer, useRef } from "react";
import { GoHome } from "react-icons/go";
import { GoHomeFill } from "react-icons/go";

import { MdOutlinePersonSearch } from "react-icons/md";
import { MdPersonSearch } from "react-icons/md";

import { RiMessage3Line } from "react-icons/ri";
import { RiMessage3Fill } from "react-icons/ri";

import { RiUser3Line } from "react-icons/ri";
import { RiUser3Fill } from "react-icons/ri";

import { TbPencil } from "react-icons/tb";
import { BiSolidPencil } from "react-icons/bi";

const tabbarReducer = (state, action) => {
  const lightLeft = `${action.left + 36}px`;
  if (action.type == "HOME") {
    return {
      home: true,
      search: false,
      pen: false,
      message: false,
      user: false,
      light: lightLeft,
    };
  }
  if (action.type == "SEARCH") {
    return {
      home: false,
      search: true,
      pen: false,
      message: false,
      user: false,
      light: lightLeft,
    };
  }
  if (action.type == "PEN") {
    return {
      home: false,
      search: false,
      pen: true,
      message: false,
      user: false,
      light: lightLeft,
    };
  }
  if (action.type == "MESSAGE") {
    return {
      home: false,
      search: false,
      pen: false,
      message: true,
      user: false,
      light: lightLeft,
    };
  }
  if (action.type == "USER") {
    return {
      home: false,
      search: false,
      pen: false,
      message: false,
      user: true,
      light: lightLeft,
    };
  }
};

const MobileTabbar = () => {
  const router = useRouter();
  const path = usePathname();

  const initTabbar = {
    home: path === "/home" ? true : false,
    search: path === "/search" ? true : false,
    pen: path === "/pen/new" ? true : false,
    message: path === "/message" ? true : false,
    user: path === "/user" ? true : false,
    light: "",
  };

  const homeRef = useRef();
  const searchRef = useRef();
  const penRef = useRef();
  const messageRef = useRef();
  const userRef = useRef();

  const [tabbar, dispatchTabbar] = useReducer(tabbarReducer, initTabbar);

  useEffect(() => {
    switch (path) {
      case "/home":
        dispatchTabbar({
          type: "HOME",
          left: homeRef.current.getBoundingClientRect().left,
        });
        break;
      case "/search":
        dispatchTabbar({
          type: "SEARCH",
          left: searchRef.current.getBoundingClientRect().left,
        });
        break;
      case "/pen/new":
        dispatchTabbar({
          type: "PEN",
          left: penRef.current.getBoundingClientRect().left,
        });
        break;
      case "/message":
        dispatchTabbar({
          type: "MESSAGE",
          left: messageRef.current.getBoundingClientRect().left,
        });
        break;
      case "/user":
        dispatchTabbar({
          type: "USER",
          left: userRef.current.getBoundingClientRect().left,
        });
        break;

      default:
        dispatchTabbar({
          type: "SEARCH",
          left: searchRef.current.getBoundingClientRect().left,
        });
        break;
    }
  }, [path]);

  const homeSwitchHandler = () => {
    dispatchTabbar({
      type: "HOME",
      left: homeRef.current.getBoundingClientRect().left,
    });
    router.push("/home");
  };

  const searchSwitchHandler = () => {
    dispatchTabbar({
      type: "SEARCH",
      left: searchRef.current.getBoundingClientRect().left,
    });
    router.push("/search");
  };

  const penSwitchHandler = () => {
    dispatchTabbar({
      type: "PEN",
      left: penRef.current.getBoundingClientRect().left,
    });
    router.push("/pen/new");
  };

  const messageSwitchHandler = () => {
    dispatchTabbar({
      type: "MESSAGE",
      left: messageRef.current.getBoundingClientRect().left,
    });
    router.push("/message");
  };

  const userSwitchHandler = () => {
    dispatchTabbar({
      type: "USER",
      left: userRef.current.getBoundingClientRect().left,
    });
    router.push("/user");
  };

  return (
    <nav className={styles.tabbar}>
      <ul>
        <li onClick={homeSwitchHandler} ref={homeRef}>
          {!tabbar.home && <GoHome className={styles.icon} />}
          {tabbar.home && (
            <GoHomeFill className={`${styles.icon} ${styles.active}`} />
          )}
        </li>
        <li onClick={searchSwitchHandler} ref={searchRef}>
          {!tabbar.search && <MdOutlinePersonSearch className={styles.icon} />}
          {tabbar.search && (
            <MdPersonSearch className={`${styles.icon} ${styles.active}`} />
          )}
        </li>
        <li onClick={penSwitchHandler} ref={penRef}>
          {!tabbar.pen && <TbPencil className={styles.icon} />}
          {tabbar.pen && (
            <BiSolidPencil className={`${styles.icon} ${styles.active}`} />
          )}
        </li>
        <li onClick={messageSwitchHandler} ref={messageRef}>
          {!tabbar.message && <RiMessage3Line className={styles.icon} />}
          {tabbar.message && (
            <RiMessage3Fill className={`${styles.icon} ${styles.active}`} />
          )}
        </li>
        <li onClick={userSwitchHandler} ref={userRef}>
          {!tabbar.user && <RiUser3Line className={styles.icon} />}
          {tabbar.user && (
            <RiUser3Fill className={`${styles.icon} ${styles.active}`} />
          )}
        </li>
      </ul>
      <div className={styles.tubelight} style={{ left: tabbar.light }}>
        <div className={styles["light-ray"]}></div>
      </div>
    </nav>
  );
};

export default MobileTabbar;