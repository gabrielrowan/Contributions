import { Contribution } from "../types/types";

type Props = {
    contribution: Contribution;
};


function ContributionCard({ contribution }: Props) {
    return <div className="contribution-card">
        <h3 className="contribution-title">{contribution.title}</h3>
        <p className="contribution-description">{contribution.description}</p>
        <p className="contribution-date">{contribution.startTime}</p>
        <p className="contribution-time">{contribution.endTime}</p>
        <span className="contribution-owner">{contribution.owner}</span>
        <span className="contribution-status">Custom handling here depending on datetime compared to now</span>
    </div>
}

export default ContributionCard