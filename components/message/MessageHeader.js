import BackButton from "../user/BackButton";
import Profile from "../user/Profile";
import { createClient } from "@/lib/supabase/client";

const MessageHeader = ({ data, id, userid, myid, onlineHandler,online }) => {
  const supabase = createClient();

  const messageChannel = supabase.channel(`room-${id}-online`);

  messageChannel
    .on("presence", { event: "join" }, ({ key, newPresences }) => {
      if (newPresences[0].user && userid && newPresences[0].user === userid) {
        onlineHandler(true);
      }
    })
    .on("presence", { event: "leave" }, ({ key, leftPresences }) => {
      if (leftPresences[0].user && userid && leftPresences[0].user === userid) {
        onlineHandler(false);
      }
    })
    .subscribe(async (status) => {
      if (status !== "SUBSCRIBED") {
        return;
      }
      await messageChannel.track({
        user: myid,
      });
    });

  return (
    <header className="fixed top-0 bg-black w-full px-6 py-4 flex items-center justify-between border-b-2 border-zinc-900">
      <div className="relative">
        <Profile
          profile={data.profile}
          fullname={data.fullname}
          username={data.username}
          isVerified={data.isVerified}
          small={true}
        />
        {online && (
          <div className="absolute -bottom-2 -right-2 bg-green-500 w-5 h-5 rounded-full"></div>
        )}
      </div>
      <BackButton className={"text-4xl"} />
    </header>
  );
};

export default MessageHeader;
