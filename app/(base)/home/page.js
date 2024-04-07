import SignOutForm from "@/components/Auth/SignoutForm";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

const Home = async () => {
  const supabase = createClient();
  const data = await supabase.auth.getUser();
  if (!data.data.user) redirect("/auth");
  return <SignOutForm />;
};

export default Home;
