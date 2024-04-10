"use server";
import { revalidatePath } from "next/cache";
import { createClient } from "../supabase/client";

export const getReqData = async () => {
  const supabase = createClient();
  const myAuth = await supabase.auth.getUser();
  const { data } = await supabase.from("user").select("reqIn").eq("id", myAuth.data.user.id);
  revalidatePath("/home/notification");
  return data[0].reqIn;
};
