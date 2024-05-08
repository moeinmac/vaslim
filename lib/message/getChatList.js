import { cache } from "react";
import { createClient } from "@/lib/supabase/server";

export const getChatList = cache(async (myid) => {
  const supabase = createClient();
  const { data } = await supabase.from("user").select("message").eq("id", myid).single();
  return data;
});
