import { createClient } from "@/lib/supabase/client";
import { useState, useEffect } from "react";

const useOnline = (channel_id, myid, userid) => {
  const supabase = createClient();
  const [isOnline, setIsOnline] = useState();

  const messageChannel = supabase.channel(`room-${channel_id}`);

  useEffect(() => {
    messageChannel
      .on("presence", { event: "join" }, ({ key, newPresences }) => {
        console.log("JOIN");
        console.log({ new: newPresences[0].user, userid });
        if (newPresences[0].user && userid && !isOnline && newPresences[0].user === userid) {
          setIsOnline(true);
        }
      })
      .on("presence", { event: "leave" }, ({ key, leftPresences }) => {
        console.log("LEAVE");
        if (leftPresences[0].user && userid && isOnline && leftPresences[0].user === userid) {
          setIsOnline(false);
        }
      });
  }, []);

  messageChannel.subscribe(async (status) => {
    if (status !== "SUBSCRIBED") {
      return;
    }
    await messageChannel.track({
      user: myid,
    });
  });

  const untrackPresence = async () => {
    await messageChannel.untrack();
  };

  return {
    isOnline,
    untrackHandler: untrackPresence,
  };
};

export default useOnline;
