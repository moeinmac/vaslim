"use server";
import { revalidatePath } from "next/cache";

import { createClient } from "../supabase/client";

export const sendComment = async (comment, id, myUsername) => {
  const commentData = {
    comment,
    username: myUsername,
    posted_at: new Date().toISOString(),
  };
  const supabase = createClient();
  const { data } = await supabase.from("pen").select().eq("id", id);
  const user = await supabase.from("user").select().eq("id", data[0].author);

  await supabase
    .from("pen")
    .update({
      comment: [...data[0].comment, commentData],
    })
    .eq("id", id);

  await supabase
    .from("user")
    .update({
      notification: {
        isChecked: false,
        data: [...user.data[0].notification["data"], { type: "comment", username: myUsername,id }],
      },
    })
    .eq("id", user.data[0].id);

  revalidatePath(`/pen/${id}`);
};
