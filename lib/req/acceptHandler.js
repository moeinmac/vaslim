"use server";

import removeVasl from "../removeVasl";
import { createClient } from "../supabase/client";
import { revalidatePath } from "next/cache";

export const acceptHandler = async (user, me) => {
  const myUsername = me.username;
  const userUsername = user.username;

  const supabase = createClient();

  await supabase.rpc("append_new_vasl", {
    username_add : user.username,
    username_to : me.username,
  });
  await supabase.rpc("append_new_vasl", {
    username_add : me.username,
    username_to : user.username,
  });

  await supabase
    .from("user")
    .update({ reqOut: removeVasl(user.reqOut, myUsername) })
    .eq("username", userUsername);
  await supabase
    .from("user")
    .update({ reqIn: removeVasl(me.reqIn, userUsername) })
    .eq("username", myUsername);
  revalidatePath("/user");
  revalidatePath("/home/notification");
};
