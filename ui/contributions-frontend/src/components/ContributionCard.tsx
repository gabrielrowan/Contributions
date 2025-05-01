import { Contribution } from "../types/types";
import "../styles/ContributionCard.css"
import "../styles/Global.css"

type Props = {
    contribution: Contribution;
};


function ContributionCard({ contribution }: Props) {

    const formatter = new Intl.DateTimeFormat(undefined, {
        dateStyle: "medium",
        timeStyle: "short",
    });

    const startDateTime = new Date(contribution.startTime)
    const endDateTime = new Date(contribution.endTime)
    const formattedStart = formatter.format(startDateTime);
    const formattedEnd = formatter.format(endDateTime);
    const curentDateTime = new Date();

    let status = "";

    if (curentDateTime < startDateTime) {
        status = "Scheduled"
    } else if (curentDateTime >= startDateTime && curentDateTime <= endDateTime) {
        status = "Active"
    } else {
        status = "Complete"
    }


    return <div className="contribution-card">
        <div className="contribution-title-section">
            <h3 className="contribution-title">{contribution.title}</h3>
        </div>
        <p className="contribution-description">{contribution.description}</p>
        <p className="contribution-date">{formattedStart}</p>
        <p className="contribution-time">{formattedEnd}</p>
        <div className="contribution-owner-status-section">
            <span className="contribution-owner pill">{contribution.owner}</span>
            <span className={`contribution-status ${status.toLowerCase()} pill`}>{status}</span>
        </div>
    </div>
}

export default ContributionCard