import PaginationButton from "./PaginationButton";
import "../styles/Pagination.css"

type PaginationProps = {
    totalPages: number;
    currentPage: number;
    onPageChange: (pageNum: number) => void;
};

function Pagination({ totalPages, currentPage, onPageChange }: PaginationProps) {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    return totalPages > 1 ? (
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