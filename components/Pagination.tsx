"use client";
import { PaginationDataType } from "@/app/lib/types/types";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

type PaginationPropsType = {
  paginationData: PaginationDataType;
  styles?: string;
};

function Pagination({ paginationData, styles }: PaginationPropsType) {
  const VISIBLE_PAGES = 10;
  let half = Math.floor(VISIBLE_PAGES / 2);
  const [pageToGo, setPageToGo] = useState("");
  const [showInput, setShowInput] = useState(false);
  const inpuWrappertRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  let startPage = Math.max(1, paginationData.current_page - half);
  let endPage = startPage + VISIBLE_PAGES - 1;

  if (endPage > paginationData.last_visible_page) {
    endPage = paginationData.last_visible_page;
    startPage = Math.max(1, endPage - VISIBLE_PAGES + 1);
  }
  const pages = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i,
  );

  function goToPage() {
    const page = Number(pageToGo);

    if (
      Number.isNaN(page) ||
      page < 1 ||
      page > paginationData.last_visible_page ||
      page === paginationData.current_page
    ) {
      setPageToGo("");
      return;
    }

    router.push(`?page=${page}`);
  }

  useEffect(() => {
    setPageToGo("");
    setShowInput(false);
  }, [paginationData.current_page]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        inpuWrappertRef.current &&
        !inpuWrappertRef.current.contains(event.target as Node)
      ) {
        setShowInput(false);
        goToPage();
      }
    }

    if (showInput) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showInput, pageToGo]);

  useLayoutEffect(() => {
    if (showInput) {
      requestAnimationFrame(() => {
        inputRef.current?.focus();
      });
    }
  }, [showInput]); /////useLayoutEffect - вызывается до отрисовки элемента.

  return (
    <div
      className={`flex gap-2 w-full px-2 justify-center items-center ${styles}`}
    >
      <Link
        href={`?page=${Math.max(1, paginationData.current_page - 1)}`}
        className={`${paginationData.current_page === 1 ? "pointer-events-none opacity-50" : ""} border border-black rounded-full`}
      >
        <ArrowLeft size={18} />
      </Link>
      {startPage >= 2 && (
        <>
          <Link
            href={`?page=${1}`}
            className="h-[30px] min-w-[35px] w-fit px-1 flex items-center justify-center text-sm border rounded-sm"
          >
            1
          </Link>
          <p>...</p>
        </>
      )}

      {pages.map((page) => (
        <Link
          key={page}
          className={`h-[30px] min-w-[35px] w-fit px-1 flex items-center justify-center text-sm border rounded-sm animated-pagination-btn ${
            page === paginationData.current_page ? "bg-black text-white" : ""
          }`}
          href={`?page=${page}`}
        >
          {page}
        </Link>
      ))}
      <p>...</p>
      <div className="relative inline-block">
        <p
          className={`text-sm hover:cursor-pointer transition-opacity duration-200 border w-[30px] h-[30px] flex items-center justify-center border-black rounded-sm ${
            showInput ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
          onClick={() => setShowInput(true)}
        >
          To
        </p>

        <div
          className={`absolute bottom-full flex gap-2 items-center justify-center -left-13 -top-15 h-fit fade-input ${showInput ? "show" : ""} p-3 rounded-md`}
          ref={inpuWrappertRef}
        >
          <input
            type="number"
            className="h-[30px] w-20 border text-sm outline-0 box-border border-black px-2 rounded-sm"
            placeholder={`${pageToGo || paginationData.current_page}`}
            value={pageToGo}
            ref={inputRef}
            onChange={(e) => setPageToGo(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.currentTarget.blur();
                goToPage();
              }
            }}
            onBlur={goToPage}
            autoFocus
          />
          <ArrowRight
            size={15}
            className="hover:cursor-pointer"
            onClick={goToPage}
          />
        </div>
      </div>
      {endPage < paginationData.last_visible_page && (
        <>
          <p>...</p>
          <Link href={`?page=${paginationData.last_visible_page}`}>
            {paginationData.last_visible_page}
          </Link>
        </>
      )}
      <Link
        href={`?page=${paginationData.current_page + 1}`}
        className={`${paginationData.current_page === paginationData.last_visible_page ? "pointer-events-none opacity-50" : ""} border border-black rounded-full`}
      >
        <ArrowRight size={18} />
      </Link>
    </div>
  );
}

export default Pagination;
