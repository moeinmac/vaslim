import SignupCircle from "@/components/Auth/SignupCircle";
import SignupForm from "@/components/Auth/SignupForm";

const signup = () => {
  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <SignupForm />
      <SignupCircle />
    </div>
  );
};

export default signup;
