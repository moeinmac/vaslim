import { getCommentsData } from "@/lib/pen/getCommentsData";
import CommentItem from "./CommentItem";

const CommentList = async ({ comments }) => {
  const commentData = await getCommentsData(comments);

  return (
    <div className="flex flex-col m-3 mt-0">
      {commentData.map((data) => (
        <CommentItem data={data} key={data.posted_at}/>
      ))}
    </div>
  );
};

export default CommentList;
