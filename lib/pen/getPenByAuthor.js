import { createClient } from "@/lib/supabase/client";

export const getPenByAuthor = async (username, count) => {
  const supabase = createClient();
  const user = await supabase.from("user").select().eq("username", username);
  const { data } = await supabase.from("pen").select().eq("author", user.data[0].id);
  let pens = data && data.length > count ? data.slice(data.length - count) : data;

  const convertedPens = [];

  for (let index = 0; index < pens.length; index++) {
    convertedPens.push({
      ...pens[index],
      profile: user.data[0].profile,
      fullname: user.data[0].fullname,
      username: user.data[0].username,
    });
  }
  return convertedPens
};
