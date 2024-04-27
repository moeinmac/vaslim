"use server";

import { createClient } from "../supabase/client";

export const sendStamp = async (id, myid) => {
  const supabase = createClient();
  const { data } = await supabase.rpc("append_new_stamp", {
    pen_id: id,
    user_id: myid,
  });
  return data.stamp.length
  // if (user.data[0].username === username) return data[0].stamp.length + 1;

  // await supabase
  //   .from("user")
  //   .update({
  //     notification: {
  //       isChecked: false,
  //       data: [...user.data[0].notification["data"], { type: "stamp", username, id }],
  //     },
  //   })
  //   .eq("id", user.data[0].id);
  // return data[0].stamp.length + 1;
};
