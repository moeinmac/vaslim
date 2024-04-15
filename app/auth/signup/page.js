import SignupCircle from "@/components/Auth/SignupCircle";
import SignupForm from "@/components/Auth/SignupForm";

const signup = ({ searchParams }) => {
  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <SignupForm message={searchParams.message}/>
      <SignupCircle />
    </div>
  );
};

export default signup;
