"use server";
import { createClient } from "../supabase/client";

export const sendHandler = async (formData) => {
  const supabase = createClient();

  const user_username = formData.get("userUsername");
  const my_username = formData.get("myUsername");

  await supabase.rpc("append_new_reqin", {
    user_username,
    my_username,
  });
  await supabase.rpc("append_new_reqout", {
    user_username,
    my_username,
  });
  const receiver_id = await supabase
    .from("user")
    .select("id")
    .eq("username", user_username)
    .single();
  await supabase.rpc("append_notification", {
    user_id: receiver_id.data.id,
    notification_data: {
      type: "reqIn",
      user_id: my_username,
    },
  });
};
