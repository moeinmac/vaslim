import { createClient } from "@/lib/supabase/client";

export const getCommentsData = async (comments) => {
  const supabase = createClient();
  const allData = [];
  for (const comment of comments) {
    const response = await supabase.from("user").select().eq("username", comment.username);
    const reply = comment.reply
      ? await supabase
          .from("user")
          .select("profile,fullname,isVerified")
          .eq("username", comment.reply.username)
      : null;
    const commentData = {
      ...comment,
      profile: response.data[0].profile,
      fullname: response.data[0].fullname,
      isVerified: response.data[0].isVerified,
      reply:
        reply && reply.data.length > 0
          ? {
              reply: comment.reply,
              user: reply.data[0],
            }
          : null,
    };
    allData.push(commentData);
  }
  return allData;
};
