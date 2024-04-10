import { createClient } from "@/lib/supabase/server";

const newPen = async () => {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();

  const roomOne = supabase.channel("state");

  const userStatus = {
    user: `${data.user.email}`,
    online_at: new Date().toLocaleString(),
  };

  roomOne.subscribe(async (status) => {
    if (status !== "SUBSCRIBED") {
      return;
    }

    const presenceTrackStatus = await roomOne.track(userStatus);
    console.log({ presenceTrackStatus });
  });

  const unsub = () => {
    supabase.channel("state").unsubscribe(roomOne);
  };
  return <button onClick={unsub}>unsubscribe</button>;
};

export default newPen;
