import { createClient } from "@/lib/supabase/server";
import { getUsersByPrimary } from "../getUsersByPrimary";

export const createExplorePen = async (vasl, myid) => {
  const supabase = createClient();
  const vaslUsers = await getUsersByPrimary(vasl, false, ["id"]);
  const notWantedIDs = vaslUsers.map((user) => user.id);
  notWantedIDs.push(myid);
  const { data } = await supabase
    .from("pen")
    .select("*,user(profile,username,fullname,isVerified)")
    .not("author", "in", `(${notWantedIDs})`);
  return data;
};
