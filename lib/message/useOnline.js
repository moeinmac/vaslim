import { createClient } from "@/lib/supabase/client";
import { useState, useEffect } from "react";

const useOnline = (channel_id, myid, userid) => {
  const supabase = createClient();
  const [isOnline, setIsOnline] = useState();
  const setIsOnlineHandler = (value) => setIsOnline(value);

  const messageChannel = supabase.channel(`room-${channel_id}`);

  useEffect(() => {
    messageChannel.on("presence", { event: "join" }, ({ key, newPresences }) => {
      if (newPresences[0].user && userid && !isOnline && newPresences[0].user === userid) {
        setIsOnline(true);
      }
    });
    messageChannel.on("presence", { event: "sync" }, () => {
      const newState = messageChannel.presenceState();
      let find = false;
      for (const key in newState) {
        if (newState.hasOwnProperty.call(newState, key)) {
          if (newState[key][0].user === userid) {
            find = true;
            setIsOnline(true);
          }
        }
      }
      if (!find) setIsOnline(false);
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

  messageChannel.on("presence", { event: "sync" }, () => {
    const newState = messageChannel.presenceState();
    let find = false;
    for (const key in newState) {
      if (newState.hasOwnProperty.call(newState, key)) {
        if (newState[key][0].user === userid) {
          find = true;
          setIsOnline(true);
        }
      }
    }
    if (!find) setIsOnline(false);
  });

  const untrackPresence = async () => {
    await messageChannel.untrack();
    await supabase.removeChannel(messageChannel);
  };

  return {
    isOnline,
    untrackHandler: untrackPresence,
    setIsOnlineHandler: setIsOnlineHandler,
  };
};

export default useOnline;
