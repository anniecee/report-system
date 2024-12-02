
export interface Report {
  fullName: string;
  phoneNumber: string;
  location: string;
  coordinate: string;
  emergencyType: string;
  imageUrl?: string;
  description: string;
  timeReported: string;
  status: string;
}

interface ReportsList {
  onMoreInfoClick: (report: Report) => void;
}

const ReportsList: React.FC<{ onMoreInfoClick: (report: Report) => void; reports: Report[] }> = ({ onMoreInfoClick, reports }) => {
  return (
    <div className="marker-table">
      <table>
        <thead>
          <tr>
            <th>Location</th>
            <th>Type</th>
            <th>Time Reported</th>
            <th>Status</th>
            <th>Other</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report, index) => (
            <tr key={index}>
              <td>{report.location}</td>
              <td>{report.emergencyType}</td>
              <td>{new Date(report.timeReported).toLocaleString()}</td>
              <td>{report.status}</td>
              <td>
                <button
                  className="link-button"
                  onClick={() => onMoreInfoClick(report)}
                >
                  MORE INFO
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReportsList;
