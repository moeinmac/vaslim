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

  const {data} = await supabase.from("user").select().eq("username",userUsername);

  await supabase
    .from("user")
    .update({
      reqIn: [...data[0].reqIn , myUsername],
      notification: { isChecked: false, data: data[0].notification["data"] },
    })
    .eq("username", userUsername);
};