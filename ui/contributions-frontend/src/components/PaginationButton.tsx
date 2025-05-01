import "../styles/PaginationButton.css"

type PaginationButtonProps = {
    pageNum: number;
}

function PaginationButton({ pageNum }: PaginationButtonProps) {
    return (
        <button className="page-button">{pageNum}</button>
    )

}

export default PaginationButton