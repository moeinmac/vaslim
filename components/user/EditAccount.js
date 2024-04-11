import SubmitButton from "../Auth/SubmitButton";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

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

const EditAccount = ({ username, fullname, email, phone }) => {
  const updateAccount = async (formData) => {
    "use server";
    const supabase = createClient();

    const fullname = formData.get("fullname");
    const phone = formData.get("phone");
    console.log({ fullname });

    await supabase
      .from("user")
      .update({
        fullname,
        phone,
      })
      .eq("username", username);
    // if (error) {
    //   return redirect("/user/edit?message=update-account-failed");
    // }

    return redirect("/user");
  };
  return (
    <form className="px-6 py-5 flex flex-col gap-5">
      <AccountItem data={username} readOnly title={"نام کــاربری"} />
      <AccountItem data={email} readOnly title={"ایمیل"} />
      <AccountItem data={fullname} name={"fullname"} title={"نام کــامل"} />
      <AccountItem data={phone} name={"phone"} title={"شماره تلفن"} />
      <SubmitButton
        formAction={updateAccount}
        pendingText="بررســی تغـــییرات..."
        className="bg-orange text-black text-4xl font-kalameh rounded-xl px-8 py-4 "
      >
        ذخــیره تغـــییرات
      </SubmitButton>
    </form>
  );
};

export default EditAccount;
