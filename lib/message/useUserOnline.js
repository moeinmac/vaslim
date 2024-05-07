import { useState } from "react";
import { createClient } from "../supabase/client";

const useUserOnline = (myid, userid, message_id) => {
  const supabase = createClient();
  const [online, setOnline] = useState();
  const messageChannel = supabase.channel(`room-${message_id}`);

  const handleChanges = (payload) => {
    if (payload.new.id === message_id) {
      const isUserOnline = payload.new.online.find((id) => id === userid);
      setOnline(isUserOnline);
    }
    supabase.removeChannel(messageChannel);
  };
  messageChannel
    .on("postgres_changes", { event: "UPDATE", schema: "public", table: "message" }, handleChanges)
    .subscribe();

  const sendOnlineUser = async () => {
    const { data } = await supabase.rpc("send_online_user", {
      message_id,
      user_id: myid,
    });
    const isUserOnline = data.find((id) => id === userid);
    console.log(isUserOnline);
    setOnline(isUserOnline);
  };
  return { online, sendOnlineUser };
};

export default useUserOnline;
