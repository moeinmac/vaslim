"use server";
import { revalidatePath } from "next/cache";

import { createClient } from "../supabase/client";

export const sendReply = async (commentValue, id, myUsername, reply) => {
  const supabase = createClient();
  const { data } = await supabase.from("pen").select().eq("id", id);

  const targetedComment = data[0].comment.find((comment) => {
    const commentId = new Date(comment.posted_at).getTime();
    return commentId === +reply.split("-")[0];
  });

  targetedComment.reply = {
    replied_at: new Date().toISOString(),
    comment: commentValue,
    username: myUsername,
  };

  const notTargetedComment = data[0].comment.filter((comment) => {
    const commentId = new Date(comment.posted_at).getTime();
    if (commentId != reply.split("-")[0]) return comment;
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
  const { data } = await supabase.from("pen").select().eq("id", id);

  const commentData = {
    comment: commentValue,
    username: myUsername,
    posted_at: new Date().toISOString(),
    reply: {},
  };

  await supabase
    .from("pen")
    .update({
      comment: [...data[0].comment, commentData],
    })
    .eq("id", id);

  const user = await supabase.from("user").select().eq("id", data[0].author);
  await supabase
    .from("user")
    .update({
      notification: {
        isChecked: false,
        data: [...user.data[0].notification["data"], { type: "comment", username: myUsername, id }],
      },
    })
    .eq("id", user.data[0].id);

  revalidatePath(`/pen/${id}`);
};
