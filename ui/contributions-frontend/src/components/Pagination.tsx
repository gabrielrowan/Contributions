import PaginationButton from "./PaginationButton";
import "../styles/Pagination.css"

type PaginationProps = {
    totalPages: number;
    currentPage: number;
    onPageChange: (pageNum: number) => void;
    loading: boolean;
};

function Pagination({ totalPages, currentPage, onPageChange, loading }: PaginationProps) {
    // generate an array of numbers up to the amount of totalPages, so that these numbers can populate the pagination buttons
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    // only display pages if loading has finished and there is more than 1 page to display
    return totalPages > 1 && loading !== true ? (
        <div className="pagination-section">
            {pageNumbers.map((pageNum) => (
                <PaginationButton
                    key={pageNum}
                    pageNum={pageNum}
                    handlePageClick={() => onPageChange(pageNum)}
                    isActive={pageNum === currentPage}
                />))}
        </div>
    ) : null;
}

export default Pagination;