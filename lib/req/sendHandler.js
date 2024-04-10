"use server"
import { createClient } from "../supabase/client";


export const sendHandler = async (user , me) => {
  const supabase = createClient();
  
  const myUsername = me.username;
  const userUsername = user.username;

  await supabase
    .from("user")
    .update({ reqOut: Array.from(new Set([...me.reqOut, userUsername])) })
    .eq("username", myUsername);
  await supabase
    .from("user")
    .update({
      reqIn: Array.from(new Set([...user.reqIn, myUsername])),
      notification: { isChecked: false, data: user.notification["data"] },
    })
    .eq("username", userUsername);
};