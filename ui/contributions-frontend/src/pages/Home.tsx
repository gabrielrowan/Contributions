import ContributionCard from "../components/ContributionCard";
import { getContributions, searchContributions } from "../services/api";
import { useEffect, useState } from "react";
import { Contribution } from "../types/types";
import NavBar from "../components/Navbar";
import "../styles/Home.css"
import "../styles/Global.css"


function Home() {
    const [contributions, setContributions] = useState<Contribution[]>([]);
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState("");

    const loadContributions = async () => {
        try {
            setContributions(await getContributions());
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
    };

    useEffect(() => {
        loadContributions();
    }, []);

    const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!searchQuery.trim()) return
        if (loading) return

        setLoading(true)

        try {
            const searchResults = await searchContributions(searchQuery)
            setContributions(searchResults)
            setError(null)
        } catch (err) {
            console.log(err)
            setError("Failed to search contributions...")
        } finally {
            setLoading(false)
        }
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

        </div>
    )
}


export default Home;