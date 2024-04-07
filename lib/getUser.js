import { createClient } from "./supabase/server"

const getUser =async (username) => {
  const supabase = createClient();
  const response =await supabase.from("user").select().eq("username",username);
  console.log(response.da);
  if(response.data) return response.data[0]

}

export default getUser