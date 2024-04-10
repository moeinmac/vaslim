"use server"
import removeVasl from "../removeVasl";
import { createClient } from "../supabase/client";


export const reclaimHandler = async (user , me) => {
  const supabase = createClient();
  const myUsername = me.username;
  const userUsername = user.username;

  await supabase
    .from("user")
    .update({ reqIn: removeVasl(user.reqIn, myUsername) })
    .eq("username", userUsername);
  await supabase
    .from("user")
    .update({ reqOut: removeVasl(me.reqOut, userUsername) })
    .eq("username", myUsername);
};