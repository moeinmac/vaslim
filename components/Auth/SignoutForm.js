import { logoutHandler } from "@/lib/logoutHandler";


const SignOutForm = () => {

  return (
    <form action={logoutHandler}>
      <button className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover">
        Logout
      </button>
    </form>
  );
};

export default SignOutForm;
