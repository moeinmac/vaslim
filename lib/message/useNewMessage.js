import { useState } from "react";
import { createClient } from "../supabase/client";
const supabase = createClient();
import { unreadMessageHandler } from "./unreadMessageHandler";

const useNewMessage = (message_id, userid) => {
  const messageChannel = supabase.channel(`room-${message_id}`);
  const [loadingMessage, setLoadingMessage] = useState(false);

  const sendNewMessage = async (message, isOnline) => {
    setLoadingMessage(message);
    await supabase.rpc("append_message", {
      message_id,
      message_data: message,
    });
    messageChannel.send({
      type: "broadcast",
      event: "message",
      payload: message,
    });
    setLoadingMessage(false);
    if(!isOnline) await unreadMessageHandler(userid, message_id);
  };

  return { loadingMessage, sendNewMessage };
};

export default useNewMessage;
