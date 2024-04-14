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
  const { data } = await supabase.from("pen").select("comment").eq("id", id);
  await supabase
    .from("pen")
    .update({
      comment: [...data[0].comment , commentData],
    })
    .eq("id", id);

  revalidatePath(`/pen/${id}`);
};
