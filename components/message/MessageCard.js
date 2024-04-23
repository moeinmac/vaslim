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
    <div className="flex flex-col flex-1 justify-between">
      <MessageHeader data={userdata} />
      <div className="fixed bottom-0 z-30 w-full">
        <MessageList myid={mydata.id} />
        <NewMessage myid={mydata.id} />
      </div>
    </div>
  );
};

export default MessageCard;
