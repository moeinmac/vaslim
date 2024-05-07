import SubmitButton from "../Auth/SubmitButton";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";

const AccountItem = ({ name, title, data, readOnly }) => {
  return (
    <div className="relative">
      <label className="absolute font-alibaba text-sm px-2 -top-2 right-4 bg-black ">{title}</label>
      <input
        defaultValue={data}
        className={`${
          readOnly ? "border-orange" : "border-gray"
        } bg-transparent w-full font-alibaba text-lg outline-0 border-2  px-4 pb-2 pt-3 rounded-xl`}
        type={title === "رمز عبور" ? "password" : "text"}
        dir="auto"
        name={name}
        required
        readOnly={readOnly ? true : null}
      />
    </div>
  );
};

const EditAccount = ({ username, fullname, email, phone, id }) => {
  const updateAccount = async (formData) => {
    "use server";
    const supabase = createClient();

    const fullname = formData.get("fullname");
    const phone = formData.get("phone");

    await supabase
      .from("user")
      .update({
        fullname,
        phone,
      })
      .eq("id", id);

    return redirect("/user");
  };
  return (
    <form className="px-6 pt-5 flex flex-col gap-5">
      <p className="font-alibaba text-sm text-gray mt-1">
        تغییر نام کاربری و ایمیل هنوز در دست توسعه میباشد ، اگر از نام کاربری خود رضایت ندارید به
        پشتیبانی اطلاع دهید
      </p>
      <AccountItem data={username} readOnly title={"نام کــاربری"} />
      <AccountItem data={email} readOnly title={"ایمیل"} />
      <AccountItem data={fullname} name={"fullname"} title={"نام کــامل"} />
      <AccountItem data={phone} name={"phone"} title={"شماره تلفن"} />
      <SubmitButton
        formAction={updateAccount}
        pendingText="بررســی تغـــییرات..."
        className="bg-orange text-black text-4xl font-kalameh rounded-xl px-8 py-3 "
      >
        ذخــیره تغـــییرات
      </SubmitButton>
      <Link
        className="bg-gray text-center text-black text-4xl font-kalameh rounded-xl px-8 py-3"
        href="/user"
      >
        ولش کــن
      </Link>
    </form>
  );
};

export default EditAccount;
