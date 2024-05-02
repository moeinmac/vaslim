"use client";

import { fetchHomePen } from "@/lib/pen/fetchHomePen";
import HomePenItem from "./HomePenItem";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

const HomePen = ({ vasl, myid, initPens }) => {
  const [pens, setPens] = useState(initPens);
  const [page, setPage] = useState(1);
  const [ref, isView] = useInView();
  const loadMorePens = async () => {
    if (page === -1) return;
    const nextpage = page + 1;
    const data = await fetchHomePen(vasl, nextpage);
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
    <div className="flex flex-col gap-4 px-6">
      {pens.map((pen) => (
        <HomePenItem key={pen.id} pen={pen} myid={myid} />
      ))}
      {page !== -1 && (
        <div className="flex justify-center">
          <div ref={ref} className="penloader"></div>
        </div>
      )}
      {page === -1 && <div className="flex justify-center font-alibaba">قلم جدیدی برای نمایش نیست</div>}
    </div>
  );
};

export default HomePen;
