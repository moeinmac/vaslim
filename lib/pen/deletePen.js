"use server"
import { revalidatePath } from "next/cache";
import { createClient } from "../supabase/client";

export const deletePen = async (pen_id) => {
  const supabase = createClient();
  await supabase.from("pen").delete().eq("id", pen_id);
  revalidatePath("/user");
};
