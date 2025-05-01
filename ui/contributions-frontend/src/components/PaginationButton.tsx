import "../styles/PaginationButton.css"

type PaginationButtonProps = {
    pageNum: number;
    handlePageClick: () => void;
    isActive: boolean;
}

function PaginationButton({ pageNum, handlePageClick, isActive }: PaginationButtonProps) {
    return (
        <button className={`page-button ${isActive ? "active" : ""}`} onClick={handlePageClick}>{pageNum}</button>
    )
}

export default PaginationButton