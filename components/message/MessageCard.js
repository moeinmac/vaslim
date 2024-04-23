import { getUsersByPrimary } from "@/lib/getUsersByPrimary";
import MessageHeader from "./MessageHeader";
import MessageList from "./MessageList";
import NewMessage from "./NewMessage";

const MessageCard = async ({ users, me }) => {
  const data = await getUsersByPrimary(users, true, [
    "profile",
    "username",
    "isVerified",
    "fullname",
    "id",
  ]);

  const userdata = data.find((user) => user.id !== me);
  const mydata = data.find((user) => user.id === me);
  return (
    <div className="flex flex-col h-[95vh] justify-between">
      <MessageHeader data={userdata} />
      <MessageList myid={mydata.id} />
      <NewMessage myid={mydata.id} />
    </div>
  );
};

export default MessageCard;
