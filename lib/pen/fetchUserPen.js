"use server";

import { createClient } from "../supabase/client";

export const fetchUserPen = async (id, page) => {
  const supabase = createClient();

  const { data } = await supabase
    .from("pen")
    .select()
    .eq("author", id)
    .order("created_at", { ascending: false })
    .range((page - 1) * 4, (page - 1) * 4 + 4 - 1);
  return data;
};
