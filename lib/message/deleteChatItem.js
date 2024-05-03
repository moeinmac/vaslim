"use server";

import { createClient } from "../supabase/client";
import { revalidatePath } from "next/cache";
const supabase = createClient();

const deleteChatfromUser = async (user_id, message_id) => {
  const { data } = await supabase.from("user").select("message").eq("id", user_id).single();
  const deletedMessageData = data.message.filter((item) => item.id !== message_id);
  await supabase.from("user").update({ message: deletedMessageData }).eq("id", user_id);
};

export const deleteChatItem = async (message_id) => {
  const message_data = await supabase.from("message").select("users").eq("id", message_id).single();
  message_data.data.users.forEach(async (item) => {
    await deleteChatfromUser(item, message_id);
  });
  await supabase.from("message").delete().eq("id" , message_id);
  revalidatePath("/message");
};
