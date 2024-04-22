import { createClient } from "@/lib/supabase/client";

const testme = () => {
  const supabase = createClient();
  const channelB = supabase.channel("room-1");

  channelB.subscribe((status) => {
    if (status !== "SUBSCRIBED") {
      return null;
    }
    channelB.send({
      type: "broadcast",
      event: "test",
      payload: { message: "hello, world" },
    });
  });
  return <h1>Test</h1>;
};

export default testme;
