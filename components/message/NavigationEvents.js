"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { leaveOnlineUser } from "@/lib/message/leaveOnlineUser";

export function NavigationEvents({myid}) {
  const searchParams = useSearchParams()
  const path = usePathname();
  const prevUrl = useRef(null);

  useEffect(() => {
    if (path.startsWith("/message") && path !== "/message") {
      prevUrl.current = path;
    }
    if (path === "/message") {
      if (prevUrl.current && !searchParams.get("error")) {
        leaveOnlineUser(myid , prevUrl.current.split("/")[2])
        prevUrl.current = null;
      } else prevUrl.current = null;
    }
  }, [path,searchParams]);

  return null;
}
