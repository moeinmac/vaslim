"use server";

import removeVasl from "../removeVasl";
import { createClient } from "../supabase/client";

export const unVaslHandler = async (user, me) => {
  const supabase = createClient();

  await supabase
    .from("user")
    .update({ vasl: removeVasl(user.vasl, me.username) })
    .eq("username", user.username);
  await supabase
    .from("user")
    .update({ vasl: removeVasl(me.vasl, user.username) })
    .eq("username", me.username);
};
