import Image from "next/image";
import Modal from "../../Modal/Modal";
import TextareaAutosize from "react-textarea-autosize";
import SubmitButton from "../../Auth/SubmitButton";
import { sendReport } from "@/lib/sendReport";

const ReportProblem = ({ closeReport, id }) => {
  const sendReportHandler = async (formData) => {
    await sendReport(formData);
    closeReport();
  };
  return (
    <Modal
      onClose={closeReport}
      className={"bg-blue flex flex-col items-center gap-4 bottom-0 w-full rounded-t-xl"}
    >
      <h2 className="font-kalameh text-4xl">گـــزارش یک مشکــل</h2>
      <p className="font-alibaba mb-8">
        شما میتوانید <strong>انتقادات و پیشنهادات</strong> و یا <strong>مشکلات و خطا هایی</strong>{" "}
        که هنگام استفاده از وب اپلیکیشن وصلیم برای شما پیش آمده را برای تیم پشتیبانی و توسعه وصلیم
        ارسال کنید.
      </p>
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
          <p>واحد پشتیبانی و توسعه وصــلیم</p>
        </div>
      </div>
      <form className="flex flex-col gap-4 w-full mb-4">
        <input type="hidden" defaultValue={id} name="id" />
        <TextareaAutosize
          name="problem"
          placeholder="پیام خود را اینجا بنویسید"
          minRows={6}
          dir="auto"
          maxLength={100}
          className="my-3 bg-gray text-black rounded-lg px-4 py-2 resize-none outline-0 text-lg overflow-hidden w-full font-alibaba"
        ></TextareaAutosize>
        <SubmitButton
          className={"text-4xl text-black bg-orange w-full rounded-lg py-3 font-kalameh"}
          pendingText={"در حال ارسال..."}
          formAction={sendReportHandler}
        >
          ارسال پیام به پشتیبانی
        </SubmitButton>
      </form>
    </Modal>
  );
};

export default ReportProblem;
