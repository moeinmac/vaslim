import SubmitButton from "../Auth/SubmitButton";

import { RiLoader4Line } from "react-icons/ri";

const AccountButton = ({ actionForm, buttonText, className, children }) => {
  return (
    <SubmitButton formAction={actionForm} pendingText={buttonText ? "صبر کــنید" : <RiLoader4Line className="text-2xl text-white"/>} className={className}>
      {buttonText ? buttonText : children}
    </SubmitButton>
  );
};

export default AccountButton;
