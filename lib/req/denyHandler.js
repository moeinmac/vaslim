"use server";

import removeVasl from "../removeVasl";
import { createClient } from "../supabase/client";
import { revalidatePath } from "next/cache";

export const denyHandler = async (user, me) => {
  const supabase = createClient();

  await supabase
    .from("user")
    .update({ reqOut: removeVasl(user.reqOut, me.username) })
    .eq("username", user.username);
  await supabase
    .from("user")
    .update({ reqIn: removeVasl(me.reqIn, user.username) })
    .eq("username", me.username);

  revalidatePath("/home/notification");
};
