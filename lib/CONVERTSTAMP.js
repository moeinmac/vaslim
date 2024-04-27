import { getUsersByPrimary } from "./getUsersByPrimary";
import { createClient } from "./supabase/client";

export const CONVERTSTAMP = async () => {
  const supabase = createClient();
  const allpen = await supabase.from("pen").select("id,stamp");
  for (const pen of allpen.data) {
    const penstampID = await getUsersByPrimary(pen.stamp, false, ["id"]);
    const justID = penstampID.map((user) => user.id);
    await supabase.from("pen").update({stamp : justID}).eq("id", pen.id)
  }
};
