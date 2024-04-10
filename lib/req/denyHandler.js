import removeVasl from "../removeVasl";
import { createClient } from "../supabase/client";

export const denyHandler = async (user, me) => {
  const myUsername = me.username;
  const userUsername = user.username;

  const supabase = createClient();

  await supabase
    .from("user")
    .update({ reqOut: removeVasl(user.reqOut, myUsername) })
    .eq("username", userUsername);
  await supabase
    .from("user")
    .update({ reqIn: removeVasl(me.reqIn, userUsername) })
    .eq("username", myUsername);
};
