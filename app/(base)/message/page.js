"use client"

import { createClient } from "@/lib/supabase/client";

const message = () => {
  const supabase = createClient();
  const roomOne = supabase.channel("state");

  roomOne
    .on("presence", { event: "sync" }, () => {
      const newState = roomOne.presenceState();
      console.log("sync", newState);
    })
    .on("presence", { event: "join" }, ({ key, newPresences }) => {
      console.log("join", key, newPresences);
    })
    .on("presence", { event: "leave" }, ({ key, leftPresences }) => {
      console.log("leave", key, leftPresences);
    })
    .subscribe();
  return <h1>message</h1>;
};

export default message;
