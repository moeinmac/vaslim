"use server";
import { revalidatePath } from "next/cache";
import { createClient } from "../supabase/client";

export const getNotificationData = async (notification, myid) => {
  const supabase = createClient();
  const allData = [];
  for (const notif of notification) {
    if (notif.type == "reqIn") continue;
    const user = await supabase
      .from("user")
      .select("username,fullname,profile,isVerified")
      .eq(`${notif.type === "comment" ? "username" : "id"}`, notif.user_id)
      .single();
    const { data } = await supabase.from("pen").select("pen").eq("id", notif.pen_id).single();
    allData.push({
      user: user.data,
      pen: data.pen,
      type: notif.type,
      id: notif.pen_id,
    });
  }
  await supabase.from("user").update({ notification: [] }).eq("id", myid);
  if (allData.length >= 1) revalidatePath("home/notification");
  return allData;
};
