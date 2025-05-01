import PaginationButton from "./PaginationButton";
import "../styles/Pagination.css"

function Pagination({ totalPages }: { totalPages: number }) {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="pagination-section">
            {pageNumbers.map((pageNum) => (
                <PaginationButton key={pageNum} pageNum={pageNum} />
            ))}
        </div>
    );
}

export default Pagination;