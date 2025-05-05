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
    //skipNum defines how many entries to skip when retrieving contribution entries from the api
    const [skipNum, setSkipNum] = useState(0);
    const [currentPageNum, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    //gets up to 12 contributions at a time from contributions api so that 12 entries are displayed per page
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

    // resets the page to fetch the first 12 contributions without filtering by search term
    // this allows the user to go back to being able to view all results after searching
    const handleReset = () => {
        setSearchQuery("");
        setLoading(true);
        loadContributions();
        setSkipNum(0);
        setCurrentPage(1)
    };

    // each time skipNum is updated (this happens on page change), a new api call is made to fetch 12 contributions using a different offset
    // for example, the first api call fetches entries 1-12, whereas changing to page 2 will fetch entries 13-24
    useEffect(() => {
        loadContributions();
    }, [skipNum]);


    const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // if user searchs by empty string, return without sending search term to api
        if (!searchQuery.trim()) return
        // if page is still loading a different process, do not proceed with search
        if (loading) return

        setLoading(true)
        setCurrentPage(1)

        try {
            const [searchResults, total] = await searchContributions(searchQuery)
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

    // on each page change, set the current page number and new offset value for retrieving contributions from the api
    const handlePageChange = (pageNum: number) => {
        setCurrentPage(pageNum);
        setSkipNum((pageNum - 1) * 12);
    };

    // dynamically display different html content based on: 
    // whether page is still loading,
    // if no results are returned 
    // or whether the page has finished loading and there are results to display
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

            <Pagination totalPages={totalPages} currentPage={currentPageNum} onPageChange={handlePageChange} loading={loading} />

        </div>
    )
}


export default Home;