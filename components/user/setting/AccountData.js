import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";

const dateThing = (thing) => {
  return thing ? new Date(thing).toLocaleString("fa-IR") : "در دسترس نیست";
};

const AccountData = () => {
  const supabase = createClient();
  const [data, setData] = useState();
  useEffect(() => {
    const fetchAuth = async () => {
      // const { data } = await supabase.auth.getUser();
      // const { data, error } = await supabase
      //   .from("auth.users")
      //   .select("created_at")
      //   .eq("id", "9fbeb96b-5e78-4f04-82a5-08396d0289a0");
      // setData(data.user);
      const { data, error } = await supabase.auth.admin.listUsers()
      console.log({ data, error });
    };
    fetchAuth();
  }, []);
  // console.log(data);
  return (
    <div className="flex flex-col gap-4 font-alibaba">
      <h3 className="font-alibaba text-xl">اطلاعات حساب کــاربری</h3>
      <p className="text-sm">توجه کنید : تغییر در ایمیل و نام کـاربری فعلا در دسترس نیست</p>
      {/* <div className="text-base stamp px-4 py-2 rounded-lg"> ایمیل : {data?.email}</div>
        <div className="text-base stamp px-4 py-2 rounded-lg">تاریخ ایجاد حساب : {dateThing(data?.created_at)}</div>
        <div className="text-base stamp px-4 py-2 rounded-lg">تاریخ اخرین ویرایش حساب  : {dateThing(data?.created_at)}</div>
        <div className="text-base stamp px-4 py-2 rounded-lg">تاریخ اخرین ورود به حساب  : {dateThing(data?.last_sign_in_at)}</div> */}
    </div>
  );
};

export default AccountData;
