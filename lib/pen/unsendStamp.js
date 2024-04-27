"use server";

import removeVasl from "../removeVasl";
import { createClient } from "../supabase/client";
import { revalidatePath } from "next/cache";

export const unsendStamp = async (id, myid) => {
  const supabase = createClient();
  const { data } = await supabase.from("pen").select("stamp").eq("id", id).single();
  await supabase
    .from("pen")
    .update({ stamp: removeVasl(data.stamp, myid) })
    .eq("id", id);
  return data.stamp.length;
};
