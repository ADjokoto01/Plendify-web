import { useEffect, useMemo, useState } from 'react';

import { generateDottedPages } from '@/utils/generate-dotted-pagination';

import { Dropdown } from '../dropdown';
import { cn } from '@/lib';
import { Button } from '@/components/ui';

const DOT_REPRESENTATION = '...';

export function Pagination({
  limit = 10,
  setLimit,
  page = 1,
  setPage,
  total,
}: {
  limit: number;
  setLimit: (limit: number) => void;
  page: number;
  setPage: (page: number) => void;
  total: number;
}) {
  const [goToPage, setGoToPage] = useState(page);
  useEffect(() => {
    if (page !== goToPage) setGoToPage(page);
  }, [page]);

  const limitOptions = Array.from(new Set([10, 20, 30, 50, total]))
    .sort((a, b) => a - b)
    .map((i) => {
      return {
        label: i.toString(),
        onClickFn: () => setLimit(i),
      };
    });

  const totalPages = useMemo(() => Math.ceil(total / limit), [total, limit]);
  const pageList = useMemo(
    () =>
      generateDottedPages({
        page,
        totalPages,
        dotRepresentation: DOT_REPRESENTATION,
      }),
    [page, totalPages],
  );

  function handleNextPage() {
    if (page < totalPages) setPage(page + 1);
  }

  function handlePrevPage() {
    if (page > 1) setPage(page - 1);
  }

  function handleGoToPage(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.valueAsNumber;
    if (value > totalPages) setGoToPage(totalPages);
    else if (value < 1) setGoToPage(1);
    else setGoToPage(value);
  }

  return (
    <div className="flex flex-col flex-wrap min-[1000px]:flex-row min-1270:flex-row gap-x-5 min-1270:gap-x-7 gap-y-3 text-sm justify-items-center justify-between items-center">
      <div className="flex items-center gap-2">
        <span className="text-sm text-neutral-grey-500">Rows per page</span>
        <Dropdown actions={limitOptions}>
          <Button
            size="sm"
            variant="outline"
            icon={'hugeicons:arrow-down-01'}
            iconPosition="right"
          >
            {limit}
          </Button>
        </Dropdown>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex gap-0.5 items-center">
          <Button
            size="sm"
            variant="outline"
            icon={'hugeicons:arrow-left-01'}
            iconPosition="left"
            iconProps={{ width: '16' }}
            className="text-xs leading-6 mr-2.5"
            disabled={page === 1}
            onClick={handlePrevPage}
          >
            <span className="hidden lg:inline-block">Prev</span>
          </Button>
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
                  'text-xs leading-6 w-8 h-8 rounded-lg hover:bg-neutral-grey-50',
                  {
                    'bg-neutral-grey-100 hover:bg-neutral-grey-100':
                      +pageItem === page,
                  },
                )}
                onClick={() => setPage(+pageItem)}
              >
                {pageItem}
              </button>
            );
          })}
          <Button
            size="sm"
            variant="outline"
            icon={'hugeicons:arrow-right-01'}
            iconPosition="right"
            iconProps={{ width: '16' }}
            className="text-xs leading-6 ml-2.5"
            disabled={page === totalPages}
            onClick={handleNextPage}
          >
            <span className="hidden lg:inline-block">Next</span>
          </Button>
        </div>
        <span className="hidden min-1270:flex">/</span>
        <div className=" gap-1 items-center hidden min-1270:flex">
          <span className="hidden md:inline-block">Go to page</span>
          <input
            type="number"
            className="w-[56px] p-1 px-3 h-8 text-center rounded-lg outline-none border text-sm border-neutral-grey-200 text-neutral-grey-600 focus:border-brand-primary [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            value={goToPage}
            onChange={handleGoToPage}
            max={totalPages}
            min={1}
          />
          <Button
            size="sm"
            variant="outline"
            icon={'hugeicons:arrow-right-01'}
            iconPosition="right"
            iconProps={{ width: '16' }}
            className="text-xs leading-6 "
            onClick={() => setPage(goToPage)}
          >
            <span className="hidden lg:inline-block">Go</span>
          </Button>
        </div>
      </div>

      <div className="flex text-sm text-neutral-grey-500">
        Showing {page * limit - limit + 1} to {Math.min(page * limit, total)} of{' '}
        {total}
      </div>
    </div>
  );
}
