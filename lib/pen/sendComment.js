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

  const { data } = await supabase.rpc("append_new_comment", {
    pen_id: id,
    comment_data,
  });

  // const user = await supabase.from("user").select().eq("id", data[0].author);
  // await supabase
  //   .from("user")
  //   .update({
  //     notification: {
  //       isChecked: false,
  //       data: [...user.data[0].notification["data"], { type: "comment", username: myUsername, id }],
  //     },
  //   })
  //   .eq("id", user.data[0].id);

  revalidatePath(`/pen/${id}`);
};
