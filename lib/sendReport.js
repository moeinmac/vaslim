"use server";

import { redirect } from "next/navigation";
import { createClient } from "./supabase/server";

export const sendReport = async (formData, id, type) => {
  const supabase = createClient();
  const message = formData.get("problem");

  id
    ? await supabase.from("report").insert({ message, from: id })
    : type
    ? await supabase.from("report").insert({ message, type })
    : await supabase.from("report").insert({ message });

  redirect(`/${type ? type : "user"}`);
};
