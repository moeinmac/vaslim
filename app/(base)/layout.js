import MobileTabbar from "@/components/tabbar/MobileTabbar";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

const baseLayout = async ({ children }) => {
  const supabase = createClient();
  const data = await supabase.auth.getUser();
  if (!data.data.user) redirect("/auth");
  return (
    <>
      <h1 className="hidden md:flex font-kalameh text-5xl px-8 py-6">
        متاسفانه وصـــلیم فقط در نسخه موبایل قــــابل استفاده است ، به زودی در بقیه دستگـــــاه ها
        هم قابـــل استفاده خواهد شد
      </h1>
      <main className="md:hidden flex flex-col min-h-screen pb-[5.5rem]">
        {children}
        {/* <MobileTabbar /> */}
      </main>
    </>
  );
};

export default baseLayout;
