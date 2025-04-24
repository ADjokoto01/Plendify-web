import { useEffect, useMemo, useState } from "react";

import { cn } from "@/lib";
import { generateDottedPages } from "@/utils/generate-dotted-pagination";

import { DoubleButton } from "@/components/ui";

const DOT_REPRESENTATION = "...";

type Props = Readonly<{
  limit: number;
  page: number;
  setPage: (page: number) => void;
  total: number;
}>;
export function SimplePagination({
  limit = 10,
  page = 1,
  setPage,
  total,
}: Props) {
  const [goToPage, setGoToPage] = useState(page);
  useEffect(() => {
    if (page !== goToPage) setGoToPage(page);
  }, [page]);

  const totalPages = useMemo(() => Math.ceil(total / limit), [total, limit]);
  const pageList = useMemo(
    () =>
      generateDottedPages({
        page,
        totalPages,
        dotRepresentation: DOT_REPRESENTATION,
      }),
    [page, totalPages]
  );

  function handleNextPage() {
    if (page < totalPages) setPage(page + 1);
  }

  function handlePrevPage() {
    if (page > 1) setPage(page - 1);
  }

  return (
    <div className="flex gap-2 justify-between items-center">
      {/* if page is 1, hide the button */}
      {page !== 1 ? (
        <DoubleButton
          className="max-w-[150px]"
          disabled={page === 1}
          onClick={handlePrevPage}
        >
          Prev
        </DoubleButton>
      ) : (
        <div></div>
      )}

      <div className="space-x-2">
        {pageList.map((pageItem) => {
          if (pageItem === DOT_REPRESENTATION) {
            return (
              <span key={pageItem} className="text-xs leading-6">
                {pageItem}
              </span>
            );
          }
          return (
            <button
              key={pageItem}
              className={cn(
                "text-xs leading-6 w-8 h-8 rounded-lg hover:bg-neutral-grey-50",
                {
                  "bg-neutral-grey-100 hover:bg-neutral-grey-100":
                    +pageItem === page,
                }
              )}
              onClick={() => setPage(+pageItem)}
            >
              {pageItem}
            </button>
          );
        })}
      </div>

      <div className="max-w-[156px] w-full">
        <DoubleButton
          disabled={page === totalPages}
          onClick={handleNextPage}
          doubleBorderColor="brand-primary"
        >
          Next
        </DoubleButton>
      </div>
    </div>
  );
}
