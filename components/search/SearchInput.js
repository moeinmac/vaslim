"use client";

import { TbUserSearch } from "react-icons/tb";
import { createClient } from "@/lib/supabase/client";
import { useRef, useState } from "react";
import AccountList from "./AccountList";

const SearchInput = () => {
  const searchRef = useRef();
  const [searchResult, setSearchResult] = useState(["clear"]);
  const supabase = createClient();
  const changeSearchHandler = async () => {
    if (searchRef.current.value.length === 0){
      setSearchResult(["clear"])
      return
    } 
    const { data, error } = await supabase
      .from("user")
      .select()
      .ilike("username", `%${searchRef.current.value}%`);
    setSearchResult(data);
  };

  return (
    <>
      <div className="flex bg-slate-700 rounded-lg items-center m-4 pr-2">
        <TbUserSearch className="text-3xl" />
        <input
          ref={searchRef}
          onChange={changeSearchHandler}
          placeholder="جستجو کاربر"
          dir="ltr"
          className="w-full text-lg font-alibaba px-3 py-2 outline-0 border-0 bg-transparent"
        />
      </div>
      <AccountList accounts={searchResult} />
    </>
  );
};

export default SearchInput;
