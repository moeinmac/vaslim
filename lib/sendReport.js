"use server";

import { redirect } from "next/navigation";
import { createClient } from "./supabase/server";

export const sendReport = async (formData) => {
  const supabase = createClient();
  const message = formData.get("problem");
  const from = formData.get("id");
  await supabase.from("problem").insert({ message, from });
  redirect("/home");
};
