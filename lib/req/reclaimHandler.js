"use server"
import removeVasl from "../removeVasl";
import { createClient } from "../supabase/client";


export const reclaimHandler = async (user , me) => {
  const supabase = createClient();

  await supabase
    .from("user")
    .update({ reqIn: removeVasl(user.reqIn, me.username) })
    .eq("username", user.username);
  await supabase
    .from("user")
    .update({ reqOut: removeVasl(me.reqOut, user.username) })
    .eq("username", me.username);
};