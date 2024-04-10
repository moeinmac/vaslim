"use server";

import removeVasl from "../removeVasl";
import { createClient } from "../supabase/client";
import { revalidatePath } from "next/cache";

export const acceptHandler = async (user, me) => {
  const myUsername = me.username;
  const userUsername = user.username;

  const supabase = createClient();

  await supabase
    .from("user")
    .update({ vasl: Array.from(new Set([...me.vasl, userUsername])) })
    .eq("username", myUsername);
  await supabase
    .from("user")
    .update({ vasl: Array.from(new Set([...user.vasl, myUsername])) })
    .eq("username", userUsername);

  await supabase
    .from("user")
    .update({ reqOut: removeVasl(user.reqOut, myUsername) })
    .eq("username", userUsername);
  await supabase
    .from("user")
    .update({ reqIn: removeVasl(me.reqIn, userUsername) })
    .eq("username", myUsername);
  revalidatePath("/user");
};
