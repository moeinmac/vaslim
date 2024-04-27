import { createClient } from "@/lib/supabase/client";

export const getCommentsData = async (comments) => {
  const supabase = createClient();
  const allData = [];
  for (const comment of comments) {
    const { data } = await supabase
      .from("user")
      .select("fullname,profile,isVerified")
      .eq("username", comment.username)
      .single();

    const comment_data = {
      ...comment,
      user: data,
    };

    if (comment.reply && comment.reply.username) {
      const reply = await supabase
        .from("user")
        .select("profile,fullname,isVerified")
        .eq("username", comment.reply.username)
        .single();
      comment_data.reply = {
        ...comment.reply,
        user: reply.data,
      };
    }
    allData.push(comment_data);
  }
  return allData;
};
