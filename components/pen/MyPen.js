"use client";

import UserPenItem from "./UserPenItem";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

import { fetchUserPen } from "@/lib/pen/fetchUserPen";

const MyPen = ({ id, myid, initPens }) => {
  const [pens, setPens] = useState(initPens);
  const [page, setPage] = useState(1);
  const [ref, isView] = useInView();
  const loadMorePens = async () => {
    if (page === -1) return;
    const nextpage = page + 1;
    const data = await fetchUserPen(id, nextpage);
    if (data.length > 0) {
      setPens((prevPens) => [...prevPens, ...data]);
      setPage(nextpage);
    } else setPage(-1);
  };
  useEffect(() => {
    if (isView) {
      loadMorePens();
    }
  }, [isView]);

  return (
    <div className="flex justify-center flex-col gap-4 px-6 pt-4">
      {pens.map((pen) => (
        <UserPenItem isMyPen myid={myid} pen={pen} key={pen.id} />
      ))}
      {page !== -1 && initPens.length >= 3 && (
        <div className="flex justify-center items-center gap-2">
          <div ref={ref} className="penloader"></div> <p className="font-alibaba">صبر کــنید</p>
        </div>
      )}
      {page === -1 && (
        <div className="flex justify-center font-alibaba">قلم جدیدی برای نمایش نیست</div>
      )}
    </div>
  );
};

export default MyPen;
