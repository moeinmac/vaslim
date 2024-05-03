"use server";

import { getUsersByPrimary } from "../getUsersByPrimary";
import { createClient } from "../supabase/client";

export const fetchHomePen = async (vasl, page) => {
  const supabase = createClient();
  const vaslUsers = await getUsersByPrimary(vasl, false, ["id"]);
  const vaslUsersID = vaslUsers.map((user) => user.id);

  const { data } = await supabase
    .from("pen")
    .select("*,user(profile,username,fullname,isVerified)")
    .in("author", vaslUsersID)
    .order("created_at", { ascending: false })
    .range((page - 1) * 4, (page - 1) * 4 + 4 - 1);
  return data;
};
