"use server";

import { createClient } from "../supabase/client";

export const sendStamp = async (id, username) => {
  const supabase = createClient();
  const { data } = await supabase.from("pen").select().eq("id", id);
  const user = await supabase.from("user").select().eq("id", data[0].author);
  await supabase
    .from("pen")
    .update({
      stamp: [...data[0].stamp, username],
    })
    .eq("id", id);

  if (user.data[0].username === username) return data[0].stamp.length + 1;
  
  await supabase
    .from("user")
    .update({
      notification: {
        isChecked: false,
        data: [...user.data[0].notification["data"], { type: "stamp", username, id }],
      },
    })
    .eq("id", user.data[0].id);
  return data[0].stamp.length + 1;
};
