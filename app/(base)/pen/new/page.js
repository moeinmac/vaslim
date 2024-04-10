"use client";

import { createClient } from "@/lib/supabase/client";

const newPen = () => {
  const supabase = createClient();
  const roomOne = supabase.channel("room_01");

  const userStatus = {
    user: "user-1",
    online_at: new Date().toISOString(),
  };

  roomOne.subscribe(async (status) => {
    if (status !== "SUBSCRIBED") {
      return;
    }

    const presenceTrackStatus = await roomOne.track(userStatus);
    console.log(presenceTrackStatus);
  });
  return <h1>new Pen</h1>;
};

export default newPen;
