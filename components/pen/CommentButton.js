import { TfiComment } from "react-icons/tfi";
import { persianNumbers } from "@/lib/persianNumbers";

const CommentButton = ({comment , onClick}) => {
  return (
    <button onClick={onClick} className="comment px-2 py-2 flex items-center gap-8 rounded-lg outline-0">
      <span className="font-alibaba text-sm">
        {comment ? persianNumbers(comment.length) : persianNumbers(0)} نظر
      </span>
      <TfiComment />
    </button>
  );
};

export default CommentButton
