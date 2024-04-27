"use client";

import CommentList from "@/components/pen/CommentList";
import PenItem from "@/components/pen/PenItem";
import PostComment from "@/components/pen/PostComment";
import CommentButton from "@/components/pen/CommentButton";
import StampButton from "@/components/pen/StampButton";
import { useState } from "react";

const PenCard = ({ data, myid, myUsername }) => {
  const [showCommentList, setShowCommentList] = useState(true);
  const [isReplying, setIsReplying] = useState(false);

  const showCommentListHandler = () => setShowCommentList(!showCommentList);

  const sendReplyData = (username, posted_at) => {
    setIsReplying({ username, posted_at });
  };

  const cancelReplyHandler = () => setIsReplying(false);

  return (
    <div className="flex flex-col">
      <PenItem data={data} myid={myid} />
      <div
        className={`mx-3 penItem_bg flex items-center justify-between p-4 ${
          !showCommentList && "rounded-b-xl"
        }`}
      >
        <StampButton id={data.id} stamp={data.stamp} myid={myid} />
        <CommentButton comment={data.comment} onClick={showCommentListHandler} />
      </div>
      <PostComment
        userUsername={data.user.username}
        myUsername={myUsername}
        id={data.id}
        isAuthor={myid === data.author}
        isReply={isReplying}
        cancelReplyHandler={cancelReplyHandler}
      />
      {showCommentList && (
        <CommentList
          sendReplyData={sendReplyData}
          comments={data.comment}
          isAuthor={myid === data.author}
        />
      )}
    </div>
  );
};

export default PenCard;
