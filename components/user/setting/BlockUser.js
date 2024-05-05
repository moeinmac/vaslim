const BlockUser = ({ reportUser }) => {
  return (
    <div className="flex flex-col gap-4 font-alibaba">
      <h3 className="font-alibaba text-xl">مسدود کردن کــاربر</h3>
      <p className="text-base">
        قابلیت مسدود سازی کاربر فعلا در دست توسعه میباشد ، اما اگر این کاربر برای شما ایجاد مزاحمت و
        یا دردسر کرده میتوانید این کاربر را گزارش کنید
      </p>
      <button onClick={reportUser} className="mt-4 font-alibaba bg-orange text-black rounded-md py-2">گزارش این کــاربر</button>
    </div>
  );
};

export default BlockUser;
