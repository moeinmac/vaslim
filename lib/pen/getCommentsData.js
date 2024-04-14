import { createClient } from "@/lib/supabase/client";

export const getCommentsData = async (comments) => {
  const supabase = createClient();
  const allData = [];
  for (const comment of comments) {
    const response = await supabase
      .from("user")
      .select()
      .eq("username", comment.username);
    console.log(response);
    const commentData = {
      ...comment,
      profile: response.data[0].profile,
      fullname: response.data[0].fullname,
      isVerified : response.data[0].isVerified
    };
    allData.push(commentData);
  }
  return allData;
};
