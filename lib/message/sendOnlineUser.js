import { createClient } from "../supabase/client";

export const sendOnlineUser = (message_id, myid, type) => {
  const supabase = createClient();
  const messageChannel = supabase.channel(`room-${message_id}`);
  messageChannel.subscribe();
  messageChannel.send({
    type: "broadcast",
    event: "message",
    payload: { type, id: myid },
  });
  if (type === "leave") supabase.removeChannel(messageChannel);
};
