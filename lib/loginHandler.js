"use server";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export const loginHandler = async (formData) => {
  const supabase = createClient();

  const username = formData.get("username");
  const password = formData.get("password");
  // if uesr's email don't start with gmail it crashes {#fix_later}
  const email = username.includes("@") ? username : `${username}@gmail.com`;

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return redirect("/auth?message=authentication-failed");
  }

  return redirect("/home");
};
