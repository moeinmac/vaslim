import { createClient } from "@/lib/supabase/client";

export const sendProfileHandler = async (file, id) => {
  const supabase = createClient();
  const { data, error } = await supabase.storage.from("profile").upload(`${id}/${Math.floor(Math.random() * 1000)}.png`, file, {
    cacheControl: "3600",
    upsert: true,
  });
  const url = supabase.storage.from("profile").getPublicUrl(data.path);
  await supabase.from("user").update({ profile: url.data.publicUrl }).eq("id", id);
  return url.data.publicUrl
};
