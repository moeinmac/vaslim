"use server";

import { createClient } from "../supabase/client";
import { revalidatePath } from "next/cache";

export const sendStamp = async (id, username) => {
  const supabase = createClient();
  const { data } = await supabase.from("pen").select("stamp").eq("id", id);
  await supabase
    .from("pen")
    .update({ stamp: Array.from(new Set([...data[0].stamp, username])) })
    .eq("id", id);
  revalidatePath("/user");
  return data[0].stamp.length + 1;
};
