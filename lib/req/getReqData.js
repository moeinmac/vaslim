"use server";
import { createClient } from "../supabase/client";

export const getReqData = async (username) => {
  const supabase = createClient();
  const { data } = await supabase.from("user").select("reqIn").eq("username", username);
  return data[0].reqIn;
};
