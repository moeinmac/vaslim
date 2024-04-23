import MobileTabbar from "@/components/tabbar/MobileTabbar";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

const baseLayout = async ({ children }) => {
  const supabase = createClient();
  const data = await supabase.auth.getUser();
  if (!data.data.user) redirect("/auth");
  return (
    <main className="flex flex-col">
      {children}
      {/* <MobileTabbar /> */}
    </main>
  );
};

export default baseLayout;
