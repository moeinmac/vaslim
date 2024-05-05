import Image from "next/image";
import Modal from "../../Modal/Modal";
import TextareaAutosize from "react-textarea-autosize";
import SubmitButton from "../../Auth/SubmitButton";
import { sendReport } from "@/lib/sendReport";

const ReportUser = ({ closeReport, user }) => {
  const sendReportHandler = async (formData) => {
    await sendReport(formData,null, user.username);
    closeReport();
  };
  return (
    <Modal
      onClose={closeReport}
      className={"bg-blue flex flex-col items-center gap-4 bottom-0 w-full rounded-t-xl"}
    >
      <h2 className="font-kalameh text-4xl">گـــزارش کــاربر</h2>
      <p className="font-alibaba">
        شما میتوانید این کــابر را به <strong>تیم پشتیبانی و امنیت وصلیم</strong> گزارش دهید ، در
        صورت متخلف بودن کاربر حتما حساب این کاربر بسته خواهد شد
      </p>

      <div className="flex flex-col w-full border-2 border-white rounded-lg p-2 gap-2 mb-6">
        <h4 className="font-alibaba">کــاربر متخلف : </h4>
        <div className="flex items-center gap-3 w-full">
          <Image
            className="rounded-lg"
            src={user.profile}
            alt="کاربر گزارش شده"
            width={55}
            height={55}
          />
          <div className="font-alibaba">
            <p>{user.fullname}</p>
            <p>{user.username}@</p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 w-full">
        <Image
          className="rounded-lg"
          src={
            "https://icvuxqufvnpifmhnduir.supabase.co/storage/v1/object/public/profile/ab968741-38ff-4499-9551-5971515da625/16.png?t=2024-04-15T11%3A37%3A21.766Z"
          }
          alt="پشتیبانی"
          width={55}
          height={55}
        />
        <div className="font-alibaba">
          <p>مــعین قــاسمی</p>
          <p>واحد بررسی امنیت وصــلیم</p>
        </div>
      </div>
      <form className="flex flex-col gap-4 w-full mb-4">
        <TextareaAutosize
          name="problem"
          placeholder="لطفا علت گزارش خود را کــامل ذکــر کــنید"
          minRows={5}
          dir="auto"
          className="my-3 bg-gray text-black rounded-lg px-4 py-2 resize-none outline-0 text-lg overflow-hidden w-full font-alibaba"
        ></TextareaAutosize>
        <SubmitButton
          className={"text-4xl text-black bg-orange w-full rounded-lg py-3 font-kalameh"}
          pendingText={"در حال ارسال..."}
          formAction={sendReportHandler}
        >
          ارسال گزارش به پشتیبانی
        </SubmitButton>
      </form>
    </Modal>
  );
};

export default ReportUser;
