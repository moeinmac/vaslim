"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "../supabase/server";

export const clearUnreadMessage = async (message_id, myid, refresh) => {
  const supabase = createClient();
  const { data } = await supabase.from("user").select("message").eq("id", myid).single();
  let messages = data.message;
  messages.forEach((messageItem) => {
    if (messageItem.hasOwnProperty("unread") && messageItem.id === message_id) {
      if (messageItem.unread === 0) return;
      messageItem.unread = 0;
    }
  });
  await supabase.from("user").update({ message: messages }).eq("id", myid);
  const messageChannel = supabase.channel(`room-${message_id}`);
  await supabase.removeChannel(messageChannel);
  if (refresh) {
    revalidatePath("/message");
  }
};
