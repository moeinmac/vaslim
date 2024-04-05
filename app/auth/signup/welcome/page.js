import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import SignupCircle from "@/components/Auth/SignupCircle";
import Image from "next/image";

const signupWelcome = async () => {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();
  let user = await supabase.from("user").select().eq("id", data.user.id);

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <div className="flex flex-col p-8">
        <h1 className="font-alibaba text-3xl">
          تـــبریک! به{" "}
          <strong className="font-kalameh text-5xl">وصـــلیم</strong> خوش آمدید.
        </h1>
        <div>
          {/* <Image fill src={user.data[0].profile} alt="profile"/> */}
        </div>
      </div>
      <SignupCircle />
    </div>
  );
};

export default signupWelcome;
