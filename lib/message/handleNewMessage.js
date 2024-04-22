"use server";

"use server";

import { createClient } from "../supabase/client";

export const handleNewMessage = async (userid, myid, userMessage, myMessage) => {
  const supabase = createClient();
  const isCreatedBefore = userMessage.find((message) => message.with === myid);
  if (isCreatedBefore) {
    const { data } = await supabase
      .from("message")
      .select("id")
      .eq("id", isCreatedBefore.id)
      .single();
    return data.id;
  }
  const id = Math.floor(100000 + Math.random() * 900000);
  await supabase.from("message").insert({ id, users: [myid, userid] });
  await supabase
    .from("user")
    .update({ message: [...userMessage, { with: myid, id }] })
    .eq("id", userid);

  await supabase
    .from("user")
    .update({ message: [...myMessage, { with: userid, id }] })
    .eq("id", myid);
  return id;
};
