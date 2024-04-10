import { createClient } from "@/lib/supabase/server";
import ReqItem from "./ReqItem";

const GetReqItem = async ({ myUsername, userUsername }) => {
  const supabase = createClient();
  const meRes = await supabase.from("user").select().eq("username", myUsername);
  const userRes = await supabase.from("user").select().eq("username", userUsername);
  return (
    <ReqItem
      user={userRes.data[0]}
      me={meRes.data[0]}
      myUsername={meRes.data[0].username}
      userUsername={userRes.data[0].username}
    />
  );
};

const ReqList = ({ myUsername, reqIn }) => {
  return (
    <div className="flex flex-col p-4 gap-4">
      {reqIn.map((username) => (
        <GetReqItem myUsername={myUsername} userUsername={username} key={username} />
      ))}
    </div>
  );
};

export default ReqList;
