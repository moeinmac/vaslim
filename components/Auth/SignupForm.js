import Button from "../UI/Button";

const Input = ({ name, placeholder, type }) => {
  return (
    <input
      required
      className="w-full text-black font-alibaba text-xl outline-0 border-0 px-4 py-3 rounded-xl mt-2"
      type={type}
      dir="auto"
      name={name}
      placeholder={placeholder}
    />
  );
};

const SignupForm = () => {
  return (
    <div className="flex flex-col p-8 justify-between h-[55%]">
      <div>
        <h1 className="font-alibaba text-3xl">
          خیلی راحت در وصـــــلیم ثبت نام کنید
        </h1>
        <p>
          توجه کنید در این بخش ایمیل خود را وارد کنید ، درواقع ایمیل همان نام
          کاربری شما در وصلیم میباشد . (انتخاب نام کاربری به صورت مجزا هنوز در
          دست توسعه میباشد)
        </p>
      </div>
      <div>
        <form>
          <Input type="text" name="username" placeholder="نام کاربری (ایمیل)"/>
          <Button className="bg-blue text-white w-full">مرحله بعدی</Button>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
