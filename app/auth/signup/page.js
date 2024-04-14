import SignupCircle from "@/components/auth/SignupCircle";
import SignupForm from "@/components/auth/SignupForm";

const signup = () => {
  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <SignupForm />
      <SignupCircle />
    </div>
  );
};

export default signup;
