"use server";
import { revalidatePath } from "next/cache";
import { createClient } from "../supabase/server";

export const editPen = async (pen_id, formData) => {
  const supabase = createClient();
  const pen = formData.get("pen");
  await supabase.from("pen").update({ pen }).eq("id", pen_id);
  revalidatePath("/user");
};
