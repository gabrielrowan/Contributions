import ContributionCard from "../components/ContributionCard";
import { getContributions, searchContributions } from "../services/api";
import { useEffect, useState } from "react";
import { Contribution } from "../components/ContributionCard";
import Pagination from "../components/Pagination";
import NavBar from "../components/Navbar";
import "../styles/Home.css"
import "../styles/Global.css"



function Home() {
    const [contributions, setContributions] = useState<Contribution[]>([]);
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState("");
    const [skipNum, setSkipNum] = useState(0);
    const [currentPageNum, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    const loadContributions = async () => {
        try {
            const [contributions, total] = await getContributions(skipNum);
            setContributions(contributions);
            setTotalPages(Math.ceil(total / 12))
        } catch (err) {
            console.log(err)
            setError("Failed to load contributions")
        } finally {
            setLoading(false)
        }
    };

    const handleReset = () => {
        setSearchQuery("");
        setLoading(true);
        loadContributions();
        setSkipNum(0);
        setCurrentPage(1)
    };

    useEffect(() => {
        loadContributions();
    }, [skipNum]);


    const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!searchQuery.trim()) return
        if (loading) return

        setLoading(true)
        setCurrentPage(1)

        try {
            const [searchResults, total] = await searchContributions(searchQuery, skipNum)
            setTotalPages(Math.ceil(total / 12))
            setContributions(searchResults)
            setError(null)
        } catch (err) {
            console.log(err)
            setError("Failed to search contributions...")
        } finally {
            setLoading(false)
        }
    };

    const handlePageChange = (pageNum: number) => {
        setCurrentPage(pageNum);
        setSkipNum((pageNum - 1) * 12);
        setLoading(true);
    };

    let content;
    if (loading) {
        content = <div className="loading-section"><h3 className="loading-text">Loading...</h3></div>;
    } else if (contributions.length === 0) {
        content = <div className="no-results-section"><h3 className="no-results-text">No results found</h3></div>;
    } else {
        content = (
            <div className="contributions-list">
                {contributions.map((contribution) => (
                    <ContributionCard contribution={contribution} key={contribution.id} />
                ))}
            </div>
        );
    }

    return (
        <div className="home">
            <NavBar onReset={handleReset} />
            <div className="search-section">
                <form onSubmit={handleSearch} className="search-form">
                    <input
                        type="text"
                        placeholder="Search by title..."
                        className="search-input"
                        value={searchQuery}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                    />
                    <button type="submit" className="search-button">
                        Search
                    </button>
                </form>
            </div>

            {content}

            <Pagination totalPages={totalPages} currentPage={currentPageNum} onPageChange={handlePageChange} />

        </div>
    )
}


export default Home;