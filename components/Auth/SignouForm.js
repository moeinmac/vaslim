import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

const SignOutForm = async () => {
  const signOut = async () => {
    "use server";
    const supabase = createClient();
    await supabase.auth.signOut();
    return redirect("/auth");
  }
  return (
    <form action={signOut}>
      <button className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover">
        Logout
      </button>
    </form>
  );
};

export default SignOutForm;
