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
};
