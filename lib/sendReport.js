"use server";

import { redirect } from "next/navigation";
import { createClient } from "./supabase/server";

export const sendReport = async (formData , id) => {
  const supabase = createClient();
  const message = formData.get("problem");
  console.log(id);
  id
    ? await supabase.from("problem").insert({ message, from : id })
    : await supabase.from("problem").insert({ message });

  redirect("/user");
};
