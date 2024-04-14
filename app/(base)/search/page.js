import SearchInput from "@/components/search/SearchInput";
import SuggestUser from "@/components/search/SuggestUser";

const search = () => {
  return (
    <>
      <SearchInput />
      <SuggestUser text={"شما میتوانید افراد زیر را به حـــساب خودتان وصل کنید:"} />
    </>
  );
};

export default search;
