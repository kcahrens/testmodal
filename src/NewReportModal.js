import React, { useState, useEffect, useRef } from 'react';
import './NewReportModal.css';

const NewReportModal = ({ onClose }) => {
  const [openCard, setOpenCard] = useState(null);
  const timeoutRef = useRef(null);
  const cardRefs = useRef([]);

  // Define the reports with titles, icons, summaries, and dropdown options (with icons and descriptions)
  const reports = [
    {
      title: 'Custom DMS Report',
      icon: 'ri-file-add-line', // Icon: blank page with plus
      summary: 'Build custom reports from scratch with flexible options.',
      options: [
        { name: 'Blank', icon: 'ri-file-line', description: 'Start with an empty template.' },
        { name: 'Advisor Performance CP', icon: 'ri-user-star-line', description: 'Track advisor performance metrics.' },
      ],
      isCustom: true,
    },
    {
      title: 'Parts Summary',
      icon: 'ri-tools-line', // Icon: tools/wrench
      summary: 'Track parts sales performance across teams.',
      options: [
        { name: 'Parts Summary by Technician', icon: 'ri-user-3-line', description: 'View technician parts sales.' },
        { name: 'Parts Summary by Advisor', icon: 'ri-user-2-line', description: 'View advisor parts sales.' },
      ],
    },
    {
      title: 'SmartVMA Menu Reports',
      icon: 'ri-bar-chart-line', // Icon: bar chart
      summary: 'Monitor menu sales metrics with detailed insights.',
      options: [
        { name: 'Menu Sales - VMA Only', icon: 'ri-bar-chart-2-line', description: 'VMA menu sales data.' },
        { name: 'Menu Sales - VMA + DMS', icon: 'ri-line-chart-line', description: 'Combined VMA and DMS data.' },
        { name: 'MPI Media SMS Report', icon: 'ri-message-2-line', description: 'SMS media performance report.' },
      ],
    },
    {
      title: 'BG Reports',
      icon: 'ri-money-dollar-circle-line', // Icon: dollar sign
      summary: 'Track commission and revenue for BG products.',
      options: [
        { name: 'Commissions', icon: 'ri-wallet-line', description: 'View commission earnings.' },
        { name: 'Revenue Custom', icon: 'ri-money-dollar-box-line', description: 'Custom revenue analysis.' },
      ],
    },
    {
      title: 'DMS Reports',
      icon: 'ri-database-2-line', // Icon: database
      summary: 'Match DMS report data with custom filters.',
      options: [
        { name: 'Custom - DMS: 3606 - Effective Labor Rate (Reynolds)', icon: 'ri-calculator-line', description: 'Labor rate analysis.' },
        { name: 'Custom - DMS: 3611 - Advisor Performance Report (Reynolds) - Without discounts', icon: 'ri-user-star-line', description: 'Advisor performance data.' },
      ],
    },
    {
      title: 'Retention Reports',
      icon: 'ri-user-follow-line', // Icon: user with plus
      summary: 'Analyze customer retention trends over time.',
      options: [
        { name: 'Retention Report', icon: 'ri-group-line', description: 'Customer retention insights.' },
      ],
    },
    {
      title: 'Legacy SmartVMA Reports',
      icon: 'ri-history-line', // Icon: clock/history
      summary: 'Access legacy sales reports from SmartVMA.',
      options: [
        { name: 'Custom - Legacy: Sales Report - DMS', icon: 'ri-file-chart-line', description: 'Legacy DMS sales data.' },
        { name: 'Custom - Legacy: Sales by Opcode', icon: 'ri-file-list-3-line', description: 'Sales by operation code.' },
      ],
    },
  ];

  // Handle mouse enter for 2-second hover delay
  const handleMouseEnter = (index) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setOpenCard({ index, openedBy: 'hover' });
    }, 2000);
  };

  // Handle mouse leave to close dropdown if opened by hover
  const handleMouseLeave = (index) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    if (openCard && openCard.index === index && openCard.openedBy === 'hover') {
      setOpenCard(null);
    }
  };

  // Handle click to toggle dropdown immediately
  const handleClick = (index) => {
    if (openCard && openCard.index === index && openCard.openedBy === 'click') {
      setOpenCard(null);
    } else {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      setOpenCard({ index, openedBy: 'click' });
    }
  };

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (openCard && cardRefs.current[openCard.index] && !cardRefs.current[openCard.index].contains(event.target)) {
        setOpenCard(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openCard]);

  // Add opening animation
  useEffect(() => {
    setTimeout(() => {
      document.querySelector('.modal-content').classList.add('open');
    }, 10);
  }, []);

  // Handle report selection
  const handleSelectReport = (reportTitle, option) => {
    console.log(`Selected: ${option} from ${reportTitle}`);
    setOpenCard(null);
    // Add your report creation logic here
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {/* Modal Header */}
        <div className="modal-header">
          <h2>New Report</h2>
          <button className="close-button" onClick={onClose}>
            ×
          </button>
        </div>

        {/* Start From Scratch Section (Header Only) */}
        <div className="modal-section no-border">
          <h3>Start From Scratch</h3>
        </div>

        {/* Custom DMS Report Section */}
        <div className="modal-section custom-dms-section">
          <div className="custom-dms-container">
            <div
              className={`custom-report-card ${openCard?.index === 0 ? 'open' : ''}`}
              onMouseEnter={() => handleMouseEnter(0)}
              onMouseLeave={() => handleMouseLeave(0)}
              onClick={() => handleClick(0)}
              ref={(el) => (cardRefs.current[0] = el)}
            >
              <div className="card-content">
                <i className={reports[0].icon}></i>
                <div className="card-text">
                  <h4>{reports[0].title}</h4>
                  <p className="section-description">{reports[0].summary}</p>
                </div>
              </div>
              <div className="dropdown-trigger">
                <i className="ri-arrow-down-s-line"></i>
              </div>
              {openCard && openCard.index === 0 && (
                <div className="dropdown-menu">
                  {reports[0].options.map((option, optIndex) => (
                    <div
                      key={optIndex}
                      className="dropdown-item"
                      onClick={() => handleSelectReport(reports[0].title, option.name)}
                    >
                      <i className={option.icon}></i>
                      <div className="dropdown-item-content">
                        <span>{option.name}</span>
                        <p>{option.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Prebuilt Templates Section */}
        <div className="modal-section">
          <h3>Choose a Prebuilt Template</h3>
          <div className="grid-container">
            {reports.slice(1).map((report, index) => (
              <div
                key={index}
                className={`grid-item ${openCard?.index === index + 1 ? 'open' : ''}`}
                onMouseEnter={() => handleMouseEnter(index + 1)}
                onMouseLeave={() => handleMouseLeave(index + 1)}
                onClick={() => handleClick(index + 1)}
                ref={(el) => (cardRefs.current[index + 1] = el)}
              >
                <div className="card-content">
                  <i className={report.icon}></i>
                  <div className="card-text">
                    <h4>{report.title}</h4>
                    <p>{report.summary}</p>
                  </div>
                </div>
                <div className="dropdown-trigger">
                  <i className="ri-arrow-down-s-line"></i>
                </div>
                {openCard && openCard.index === index + 1 && (
                  <div className="dropdown-menu">
                    {report.options.map((option, optIndex) => (
                      <div
                        key={optIndex}
                        className="dropdown-item"
                        onClick={() => handleSelectReport(report.title, option.name)}
                      >
                        <i className={option.icon}></i>
                        <div className="dropdown-item-content">
                          <span>{option.name}</span>
                          <p>{option.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewReportModal;