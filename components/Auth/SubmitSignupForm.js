"use server";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

const signupUser = async (email, password, phone) => {
  const supabase = createClient();
  const { error } = await supabase.auth.signUp({
    email,
    password,
  });
  await supabase.from("user").insert({phone,username : email.split("@")[0]});

  if (error) return redirect("/auth/signup?message=signupuser-failed");
  return redirect("/auth/signup/welcome");
};

export default signupUser;
