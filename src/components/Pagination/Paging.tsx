"use client";

// React
import React, { useState, useEffect } from "react";


import NoticeCard from "../Notice/NoticeCard";
import { getNoticeData } from "@/service/notice";

interface Props {
  noticeData: noticeData[];
}

interface noticeData {
  id: number;
  title: string;
  createdAt: Date;
  body: string;
}

export default function Paging() {
  const [noticeData, setnoticeData] = useState<any>([]);

  const [currentPage, setCurrentPage] = useState(1);
  // 한 페이지당 보여줄 데이터 수를 10으로 수정
  const itemsPerPage = 10;

  // 총 필요한 페이지 갯수 구하기
  const totalPages = Math.ceil(noticeData.length / itemsPerPage);

  // 한 페이지당 보여줄 그룹의 최대 크기
  const maxPageGroup = 5;

  // 화면에 보여질 페이지의 첫번째 페이지 번호
  const pageGroupStart = Math.max(
    1,
    currentPage - Math.floor(maxPageGroup / 2)
  );

  // 화면에 보여질 페이지의 마지막 페이지 번호
  const pageGroupEnd = Math.min(pageGroupStart + maxPageGroup - 1, totalPages);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPageData = noticeData.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => setCurrentPage(page);

  useEffect(() => {
    async function noticeData() {
      const res = await getNoticeData();

      const data = res.sort((a: noticeData, b: noticeData) =>
        a.createdAt > b.createdAt ? -1 : 1
      );
      return setnoticeData(data);
    }
    noticeData();
  }, []);

  return (
    <div>
      <NoticeCard noticeData={noticeData} />
       <div className="my-8 flex justify-center items-center">
        <button
          onClick={() => handlePageChange(currentPage - 10)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          {`<<`}
        </button>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="mx-2 px-4 py-2 bg-blue-500 text-white rounded"
        >
          {`<`}
        </button>
        {Array.from(
          { length: pageGroupEnd - pageGroupStart + 1 },
          (_, i) => i + pageGroupStart
        ).map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`mr-2 px-4 py-2 ${
              currentPage === page
                ? "bg-blue-500 text-white"
                : "bg-white text-black"
            } rounded`}
          >
            {page}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="mr-2 px-4 py-2 bg-blue-500 text-white rounded"
        >
          {`>`}
        </button>
        <button
          onClick={() => handlePageChange(currentPage + 10)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          {`>>`}
        </button>
      </div> 
    </div>
  );
}
