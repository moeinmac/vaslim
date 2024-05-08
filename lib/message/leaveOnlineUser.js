import removeVasl from "../removeVasl";
import { createClient } from "../supabase/client";

export const leaveOnlineUser = async (myid, message_id) => {
  const supabase = createClient();
  const { data } = await supabase.from("message").select("online").eq("id", message_id).single();
  await supabase
    .from("message")
    .update({ online: removeVasl(data.online, myid) })
    .eq("id", message_id);

  const onlineChannel = supabase.channel("onlineUser");
  supabase.removeChannel(onlineChannel);
};
