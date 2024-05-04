import { createClient } from "../supabase/client";

export const sendOnlineUser = (message_id, myid, type) => {
  const supabase = createClient();
  const messageChannel = supabase.channel(`room-${message_id}`);
  messageChannel.send({
    type: "broadcast",
    event: "message",
    payload: { type, id: myid },
  });
};
