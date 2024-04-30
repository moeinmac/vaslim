import { createClient } from "../supabase/client";

export const unreadMessageHandler = async (userid, message_id) => {
  const supabase = createClient();
  const { data } = await supabase.from("user").select("message").eq("id", userid).single();
  let messages = data.message;
  messages.forEach((messageItem) => {
    if (messageItem.hasOwnProperty("unread") && messageItem.id === message_id) {
      messageItem.unread += 1;
    }
  });
  await supabase.from("user").update({ message: messages }).eq("id", userid);
};