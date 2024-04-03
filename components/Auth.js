import Button from "./UI/Button";
import Input from "./UI/Input";


const Auth = () => {
  return (
    <form className="w-full flex flex-col text-black gap-8">
      <label htmlFor="username">
        نام کاربری
        <Input id="username" bg_color="FFC970" type={"text"}/>
      </label>
      <label htmlFor="password">
        رمز عبور
        <Input id="password" bg_color="FFC970" type={"password"}/>
      </label>
      <Button className={" bg-black text-white"}>ورود</Button>
    </form>
  );
};

export default Auth
