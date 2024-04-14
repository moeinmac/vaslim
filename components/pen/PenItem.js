import CommentButton from "@/components/pen/CommentButton";
import StampButton from "@/components/pen/StampButton";
import Profile from "@/components/user/Profile";
import VaslButton from "@/components/user/VaslButton";
import HeaderPen from "./HeaderPen";

const PenItem = ({ pen, user, myUsername }) => {
  return (
    <div className="stamp rounded-xl flex flex-col">
      <header className="rounded-xl p-2 flex justify-between px-6 py-4">
        <Profile
          profile={user.profile}
          fullname={user.fullname}
          username={user.username}
          isVerified={user.isVerified}
          small
        />
        <VaslButton vasl={user.vasl.length} username={user.username} />
      </header>
      <article className="whitespace-pre-wrap px-6 py-3">{pen.pen}</article>
      <footer className=" flex flex-col">
        <div className="flex items-center justify-between p-4">
          <HeaderPen created_at={pen.created_at} />
        </div>
        <div
          className={`penItem_bg flex items-center justify-between p-4 ${
            pen.comment.length === 0 ? "rounded-bl-xl rounded-br-xl" : ""
          }`}
        >
          <StampButton id={pen.id} stamp={pen.stamp} myUsername={myUsername} />
          <CommentButton comment={pen.comment} />
        </div>
      </footer>
    </div>
  );
};

export default PenItem;
