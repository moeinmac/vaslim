import { createClient } from "@/lib/supabase/server";

const username = async ({ params }) => {
  const supabase = createClient();
  const { data } = await supabase
    .from("user").select().eq("username", params.username);
  
  return <h1>{data[0].username}</h1>;
};

export default username;
