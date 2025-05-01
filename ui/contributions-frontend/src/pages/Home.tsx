import ContributionCard from "../components/ContributionCard";
import { getContributions } from "../services/api";
import { useEffect, useState } from "react";
import { Contribution } from "../types/types";


function Home() {
    const [contributions, setContributions] = useState<Contribution[]>([]);
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(true)


    useEffect(() => {
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

        loadContributions();
    }, []);

    return (
        <div className="home">
            {loading ? (
                <div className="loading">Loading...</div>
            ) : (
                <div className="contributions-grid">
                    {contributions.map((contribution) => (
                        <ContributionCard contribution={contribution} key={contribution.id} />
                    ))}
                </div>
            )}
        </div>
    )
}

export default Home;