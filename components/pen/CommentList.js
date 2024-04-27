import { getCommentsData } from "@/lib/pen/getCommentsData";
import CommentItem from "./CommentItem";

const CommentList = async ({ comments, isAuthor, sendReplyData }) => {
  const commentData = await getCommentsData(comments);
  return (
    <div className="mx-3 flex flex-col mb-[8rem]">
      {commentData.map((data) => (
        <CommentItem
          data={data}
          key={data.posted_at}
          sendReplyData={sendReplyData}
          isAuthor={isAuthor}
        />
      ))}
    </div>
  );
};

export default CommentList;
