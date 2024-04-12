"use server";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

const sendNewPen = async (formData) => {
  const pen = formData.get("pen");
  const supabase = createClient();

  const id = Math.floor(100000 + Math.random() * 900000);

  const { error } = await supabase.from("pen").insert({ id, pen });

  if (error) {
    return redirect("/pen/new?error=send-newpen-failed");
  }
  return redirect("/user");
};

export default sendNewPen;
