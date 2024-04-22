import { getUsersByPrimary } from "@/lib/getUsersByPrimary";
import MessageHeader from "./MessageHeader";

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
    <>
      <MessageHeader data={userdata}/>
      
    </>
  );
};

export default MessageCard;
