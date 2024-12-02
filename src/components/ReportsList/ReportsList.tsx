import React, { useState, useMemo } from 'react';

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
  
  interface ReportsListProps {
    onMoreInfoClick: (report: Report) => void;
    reports: Report[];
  }
  
  
  const ReportsList: React.FC<ReportsListProps> = ({ onMoreInfoClick, reports }) => {
    const [sortConfig, setSortConfig] = useState<{ key: keyof Report; direction: 'ascending' | 'descending' }>({
      key: 'timeReported',
      direction: 'descending',
    });
  
    const sortedReports = useMemo(() => { 
      const sortableReports = [...reports]; 
      sortableReports.sort((a, b) => { 
        const aValue = sortConfig.key === 'timeReported' ? new Date(a[sortConfig.key]).getTime() : a[sortConfig.key]; 
        const bValue = sortConfig.key === 'timeReported' ? new Date(b[sortConfig.key]).getTime() : b[sortConfig.key];
        
        if (aValue !== undefined && bValue !== undefined) {
          if (aValue < bValue) {
              return sortConfig.direction === 'ascending' ? -1 : 1;
          }
          if (aValue > bValue) {
              return sortConfig.direction === 'ascending' ? 1 : -1;
          }
        }
        return 0;
      });
      return sortableReports;
    }, [reports, sortConfig]);
  
    const requestSort = (key: keyof Report) => {
      let direction: 'ascending' | 'descending' = 'ascending';
      if (sortConfig.key === key && sortConfig.direction === 'ascending') {
        direction = 'descending';
      }
      setSortConfig({ key, direction });
    };
  
    const getSortIndicator = (key: keyof Report) => {
      if (sortConfig.key !== key) {
        return ' ↕'; // Default indicator when not sorted
      }
      return sortConfig.direction === 'ascending' ? ' ▲' : ' ▼';
    };
      
    return (
      <div className="marker-table">
        <table>
          <thead>
            <tr>
              <th>Location</th>
              <th>Type</th>
              <th onClick={() => requestSort('timeReported')} style={{ cursor: 'pointer' }}>
                Time Reported{getSortIndicator('timeReported')}
              </th>
              <th onClick={() => requestSort('status')} style={{ cursor: 'pointer' }}> Status{getSortIndicator('status')} </th>
              <th>Other</th>
            </tr>
          </thead>
          <tbody>
            {sortedReports.map((report, index) => (
              <tr key={index}>
                <td>{report.location}</td>
                <td>{report.emergencyType}</td>
                <td>{new Date(report.timeReported).toLocaleString()}</td>
                <td>{report.status}</td>
                <td>
                  <button className="link-button" onClick={() => onMoreInfoClick(report)}>
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