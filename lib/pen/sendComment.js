"use server";
import { revalidatePath } from "next/cache";

import { createClient } from "../supabase/client";

export const sendReply = async (commentValue, id, myUsername, reply) => {
  const supabase = createClient();

  const { data } = await supabase.from("pen").select().eq("id", id).single();

  const targetedComment = data.comment.find((comment) => {
    return new Date(comment.posted_at).getTime() === new Date(reply.posted_at).getTime();
  });

  targetedComment.reply = {
    replied_at: new Date().toISOString(),
    comment: commentValue,
    username: myUsername,
  };

  const notTargetedComment = data.comment.filter((comment) => {
    return new Date(comment.posted_at).getTime() != new Date(reply.posted_at).getTime();
  });

  await supabase
    .from("pen")
    .update({
      comment: [...notTargetedComment, targetedComment],
    })
    .eq("id", id);

  revalidatePath(`/pen/${id}`);
};

export const sendComment = async (commentValue, id, myUsername) => {
  const supabase = createClient();

  const comment_data = {
    comment: commentValue,
    username: myUsername,
    posted_at: new Date().toISOString(),
    reply: {},
  };

  await supabase.rpc("append_new_comment", {
    pen_id: id,
    comment_data,
  });

  const receiver_id = await supabase.from("pen").select("author").eq("id", id).single();
  await supabase.rpc("append_notification", {
    user_id: receiver_id.data.author,
    notification_data: {
      type: "comment",
      user_id: myUsername,
      pen_id: id,
    },
  });
  revalidatePath(`/pen/${id}`);
};
