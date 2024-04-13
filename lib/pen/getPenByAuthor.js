import { createClient } from "@/lib/supabase/client";

export const getPenByAuthor = async (username, count) => {
  const supabase = createClient();
  const user = await supabase.from("user").select().eq("username", username);
  const { data } = await supabase.from("pen").select().eq("author", user.data[0].id);
  return (data.length <= count && data)
    ? { pens : data, user: user.data[0] }
    : { pens : data.slice(data.length - 2), user: user.data[0] };
};
