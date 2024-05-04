const ChangePassowrd = () => {
  return (
    <div className="flex flex-col gap-4 font-alibaba">
      <h3 className="font-alibaba text-xl">تغییر گذرواژه</h3>
      <form><input type="password" defaultValue={123456789} className="text-black outline-0 px-4 py-2 rounded-lg" readOnly autoComplete="new-password"/></form>
      <p className="text-base">تغییر گذرواژه در دست توسعه میباشد ، از صبوری شما متشکریم.</p>
    </div>
  );
};

export default ChangePassowrd;
