import Button from "./UI/Button";
import Input from "./UI/Input";


const Auth = () => {
  return (
    <form className="w-full flex flex-col text-black gap-6 text-white">
      <label htmlFor="username" className="text-sm font-alibaba">
        نام کاربری
        <Input id="username" bg_color="FFC970" type={"text"}/>
    
      </label>
      <label htmlFor="password" className="text-sm font-alibaba">
        رمز عبور
        <Input id="password" type={"password"}/>
      </label>
      <Button className={"bg-orange text-black"}>ورود</Button>
    </form>
  );
};

export default Auth
