import { NavigationEvents } from "@/components/message/NavigationEvents";
import MobileTabbar from "@/components/tabbar/MobileTabbar";
import ShakeMobileDevice from "@/components/tabbar/ShakeMobileDevice";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Suspense } from "react";

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
        <MobileTabbar myid={data.data.user.id} />
        <Suspense fallback={null}>
          <NavigationEvents myid={data.data.user.id} />
        </Suspense>
        <ShakeMobileDevice id={data.data.user.id}/>
      </main>
    </>
  );
};

export default baseLayout;
