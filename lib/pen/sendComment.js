"use server";
import { revalidatePath } from "next/cache";

import { createClient } from "../supabase/client";

export const sendComment = async (comment, id, myUsername) => {
  const supabase = createClient();
  const { data } = await supabase.from("pen").select("comment").eq("id", id);
  await supabase
    .from("pen")
    .update({
      comment: Array.from(new Set([...data[0].comment, { comment, username: myUsername }])),
    })
    .eq("id", id);

  revalidatePath(`/pen/${id}`);
};
