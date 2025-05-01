import "../styles/ContributionCard.css"
import "../styles/Global.css"

export type Contribution = {
    id: number;
    title: string;
    description: string;
    startTime: string;
    endTime: string;
    owner: string;
};


type ContributionCardProps = {
    contribution: Contribution;
};


function ContributionCard({ contribution }: ContributionCardProps) {


    const startDateTime = new Date(contribution.startTime)
    const endDateTime = new Date(contribution.endTime)
    const formattedStart = startDateTime.toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" });
    const formattedEnd = endDateTime.toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" });
    const curentDateTime = new Date();
    const endTime = endDateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    let status = "";

    if (curentDateTime < startDateTime) {
        status = "Scheduled"
    } else if (curentDateTime >= startDateTime && curentDateTime <= endDateTime) {
        status = "Active"
    } else {
        status = "Complete"
    }


    return (
        <div className="contribution-card">
            <div className="contribution-title-section">
                <h3 className="contribution-title">{contribution.title}</h3>
            </div>
            <p className="contribution-description">{contribution.description}</p>
            <div className="contribution-datetime-range">
                {

                    startDateTime.toDateString() === endDateTime.toDateString() ?
                        <p className="contribution-date">{formattedStart} - {endTime}</p> :
                        <p className="contribution-date">{formattedStart} - {formattedEnd}</p>

                }
            </div>
            <div className="contribution-owner-status-section">
                <span className="contribution-owner pill">{contribution.owner}</span>
                <span className={`contribution-status ${status.toLowerCase()} pill`}>{status}</span>
            </div>
        </div>
    )
}

export default ContributionCard