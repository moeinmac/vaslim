import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

const messagepage = async ({ params }) => {
  const supabase = createClient();
  const { data } = await supabase.from("message").select().eq("id", params.id).single();
  if(!data) redirect("/message");

  // const myAuth = 

  return <div>{params.id}</div>;
};

export default messagepage;
