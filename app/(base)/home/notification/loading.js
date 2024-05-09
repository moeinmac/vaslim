const loading = () => {
  return (
    <main>
      <div className="flex justify-center items-center flex-col gap-4 h-[85vh] px-4">
        <div className="loader"></div>
        <h1 className="font-kalameh text-3xl text-center">
          از قسمت تنظیمات حساب میتونی <br />
          اکانتت رو با بقیه به اشتراک بذاری
        </h1>
      </div>
    </main>
  );
};

export default loading;
