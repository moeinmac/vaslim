"use server";

import { createClient } from "../supabase/client";

export const sendStamp = async (id, myid) => {
  const supabase = createClient();
  const { data } = await supabase.rpc("append_new_stamp", {
    pen_id: id,
    user_id: myid,
  });
  const receiver_id = await supabase.from("pen").select("author").eq("id", id).single();
  await supabase.rpc("append_notification", {
    user_id: receiver_id.data.author,
    notification_data: {
      type: "stamp",
      user_id: myid,
      pen_id: id,
    },
  });
  return data.stamp.length;
};
