import classNames from "classnames";
import { ELEMENT_PER_PAGE } from "../../../hooks/usePagination";

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  elements: any[] | undefined;
  currentPage: number;
  changePage: React.Dispatch<React.SetStateAction<number>>;
} & React.PropsWithChildren;

const MIN_PAGE = 1;

const Pagination = ({ elements, currentPage, changePage, children }: Props) => {
  if (!elements) return null;

  const pageNumber = Math.ceil(elements.length / ELEMENT_PER_PAGE);

  const onChangePage = (page: number) => {
    changePage(page);
  };

  const onPreviousPage = () => {
    if (currentPage === 1) return;
    changePage((prev) => --prev);
  };
  const onNextPage = () => {
    console.log("next");
    if (currentPage === pageNumber) return;
    changePage((prev) => {
      return ++prev;
    });
  };

  return (
    <>
      {children}
      <div className="join">
        <button
          className="join-item btn"
          onClick={onPreviousPage}
          disabled={currentPage === MIN_PAGE}
        >
          «
        </button>
        {[...Array(pageNumber)].map((_, index) => {
          const currentPaginationPage = index + 1;
          return (
            <button
              key={index}
              onClick={() => onChangePage(currentPaginationPage)}
              className={classNames("join-item btn", {
                "btn-active": currentPaginationPage == currentPage,
              })}
            >
              {currentPaginationPage}
            </button>
          );
        })}

        <button
          className="join-item btn"
          onClick={onNextPage}
          disabled={currentPage === pageNumber}
        >
          »
        </button>
      </div>
    </>
  );
};

export default Pagination;
