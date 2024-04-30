import { createClient } from "@/lib/supabase/client";
import { useState, useEffect } from "react";

const useOnline = (channel_id, myid, userid) => {
  const supabase = createClient();
  const [isOnline, setIsOnline] = useState();
  console.log({ isOnline });

  const messageChannel = supabase.channel(`room-${channel_id}_off`);

  useEffect(() => {
    messageChannel.on("presence", { event: "join" }, ({ key, newPresences }) => {
      console.log("JOIN");
      console.log({ new: newPresences[0].user, userid });
      if (newPresences[0].user && userid && !isOnline && newPresences[0].user === userid) {
        setIsOnline(true);
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

  messageChannel.on("presence", { event: "sync" }, () => {
    const newState = messageChannel.presenceState();
    console.log(newState);
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
    const track = await messageChannel.untrack();
    const uns = await supabase.removeChannel(messageChannel);

    console.log({ track, uns });
  };

  return {
    isOnline,
    untrackHandler: untrackPresence,
  };
};

export default useOnline;
