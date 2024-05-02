import { createClient } from "@/lib/supabase/client";
import { getUsersByPrimary } from "../getUsersByPrimary";

export const fetchExplorePen = async (vasl, myid, page) => {
  const supabase = createClient();
  const vaslUsers = await getUsersByPrimary(vasl, false, ["id"]);
  const notWantedIDs = vaslUsers.map((user) => user.id);
  notWantedIDs.push(myid);
  const { data } = await supabase
    .from("pen")
    .select("*,user(profile,username,fullname,isVerified)")
    .not("author", "in", `(${notWantedIDs})`)
    .order("created_at", { ascending: false })
    .range((page - 1) * 3, (page - 1) * 3 + 3 - 1);
  return data;
};
