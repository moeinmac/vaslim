import { createClient } from "../supabase/client";

export const getRequestedPens = async (usersID, limit) => {
  const supabase = createClient();
  const allData = [];
  for (const user of usersID) {
    const { data } = await supabase
      .from("pen")
      .select("*,user(profile,username,fullname,isVerified)")
      .eq("author", user.id)
      .limit(limit);
    allData.push(data);
  }
  const spreadAlldata = [];
  for (const item of allData) {
    spreadAlldata.push(...item);
  }
  return spreadAlldata;
};
