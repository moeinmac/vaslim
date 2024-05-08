import UserMessageButton from "../message/UserMessageButton";

const VaslimAccount = ({ usermessage, mymessage, userid, myid }) => {
  return (
    <div className="flex flex-col gap-4 px-6 py-4">
      <p className="font-alibaba">صفحه رسمی شبکه اجتماعی وصـــلیم ، اخبار و بروز رسانی ها - اگر سوالی دارید بپرسید!</p>
      <UserMessageButton
        userMessage={usermessage}
        myMessage={mymessage}
        userid={userid}
        myid={myid}
      />
    </div>
  );
};

export default VaslimAccount;
