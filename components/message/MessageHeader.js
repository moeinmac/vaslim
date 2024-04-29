import { createClient } from "@/lib/supabase/client";
import BackButton from "../user/BackButton";
import Profile from "../user/Profile";

const MessageHeader = ({ data, id, userid }) => {
  const supabase = createClient();

  const roomOne = supabase.channel("room-562938");

  const userStatus = {
    user: userid,
    online_at: new Date().toISOString(),
  };

  roomOne
    .on("presence", { event: "sync" }, () => {
      const newState = roomOne.presenceState();
      console.log("sync", newState);
    })
    .on("presence", { event: "join" }, ({ key, newPresences }) => {
      console.log("join", key, newPresences);
    })
    .on("presence", { event: "leave" }, ({ key, leftPresences }) => {
      console.log("leave", key, leftPresences);
    })
    .subscribe(async (status) => {
      if (status !== "SUBSCRIBED") {
        return;
      }

      const presenceTrackStatus = await roomOne.track(userStatus);
      console.log(presenceTrackStatus);
    });

  return (
    <header className="fixed top-0 bg-black w-full px-6 py-4 flex items-center justify-between border-b-2 border-zinc-900">
      <Profile
        profile={data.profile}
        fullname={data.fullname}
        username={data.username}
        isVerified={data.isVerified}
        small={true}
      />
      <BackButton className={"text-4xl"} />
    </header>
  );
};

export default MessageHeader;
