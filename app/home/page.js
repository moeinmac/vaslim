import SignOutForm from "@/components/Auth/SignoutForm";
import MobileTabbar from "@/components/tabbar/MobileTabbar";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

const Home = async () => {
  const supabase = createClient();
  const data = await supabase.auth.getUser();
  if (!data.data.user) redirect("/auth");
  return (
    <main>
      <SignOutForm />
      <MobileTabbar />
    </main>
  );
};

export default Home;
