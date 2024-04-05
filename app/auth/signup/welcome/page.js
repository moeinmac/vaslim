import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import SignupCircle from "@/components/Auth/SignupCircle";
import Image from "next/image";
import Button from "@/components/UI/Button";

const signupWelcome = async () => {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();
  if(!data.user) redirect("/auth");

  let user = await supabase.from("user").select().eq("id", data.user.id);

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <div className="flex flex-col p-8 gap-4">
        <h1 className="font-alibaba text-3xl">
          تـــبریک! به{" "}
          <strong className="font-kalameh text-5xl">وصـــلیم</strong> خوش آمدید.
        </h1>
        <div className="flex flex-col items-center gap-2 mt-10">
          <Image
            width={64}
            height={64}
            src={user.data[0].profile}
            alt="profile"
            className="bg-white rounded-full"
          />
          <span>{data.user.email.split("@")[0]}</span>
        </div>
        <div className="flex flex-col gap-8">
          <p>شما همیشه میتوانید اطلاعات پروفایل خود را به روز رسانی کنید</p>
          <Button path={"/home"} className="bg-blue text-white">
            تو وصلیم چه خبره؟
          </Button>
        </div>
      </div>
      <SignupCircle />
    </div>
  );
};

export default signupWelcome;
