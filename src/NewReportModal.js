import React, { useState, useEffect, useRef } from 'react';
import './NewReportModal.css';

// Import images from src/pictures/ (updated to .png where applicable)
import AdvisorPerformanceCPImage from './pictures/AdvisorPerformanceCP.png';
import VmaDmsImage from './pictures/vma_dms.png';
import VmaImage from './pictures/vma.png';
import PartTechImage from './pictures/parttech.png';
import EffectiveLaborRateImage from './pictures/EffectiveLaborRate.png';
import AdvisorPerformanceReportRRImage from './pictures/AdvisorPerformanceReportRR.png';
import RAPReportImage from './pictures/RAP Report.png';
import SAClassImage from './pictures/SACLASSREPORT.png';
import LegacySaleReportDMSImage from './pictures/LegacySaleReportDMS.png';
import LegacySalesByOpcodeImage from './pictures/LegacySalesbyOpcode.png';
import CommissionsImage from './pictures/Commissions.png';
import RevenueImage from './pictures/Revenue.png';
import MPImediaImage from './pictures/MPImedia.png';
import OPCodeAnalysisReportImage from './pictures/OPCodeAnalysisReport.png';
import PartAdvisorImage from './pictures/Partadvisor.png';
// Note: RetentionImage is missing from your directory; commented out below where used

const NewReportModal = ({ onClose }) => {
  const [openCard, setOpenCard] = useState(null);
  const [hoveredOption, setHoveredOption] = useState(null);
  const timeoutRef = useRef(null);
  const cardRefs = useRef([]);

  const reports = [
    {
      title: 'Custom DMS Report',
      icon: 'ri-file-add-line',
      summary: 'Build custom reports from scratch with flexible options. KPIs like RO count, Revnue, ELR & GP figures. Group by Advisor, opcode, model and more.',
      options: [
        { 
          name: 'Blank', 
          icon: 'ri-file-line', 
          description: 'Start with an empty template.',
        },
      ],
      isCustom: true,
    },
    {
      title: 'Parts Summary',
      icon: 'ri-tools-line',
      summary: 'Track parts sales, Reports require a parts category to be selected.',
      options: [
        { 
          name: 'Parts Summary by Advisor', 
          icon: 'ri-user-2-line', 
          description: 'View advisor parts sales.',
          picture: PartAdvisorImage, // Fixed typo: PartadvisorImag -> PartAdvisorImage
        },
        { 
          name: 'Parts Summary by Technician', 
          icon: 'ri-user-3-line', 
          description: 'View technician parts sales.',
          picture: PartTechImage, // Corrected to match import
        },
      ],
    },
    {
      title: 'SmartVMA Menu Reports',
      icon: 'ri-bar-chart-line',
      summary: 'Monitor menu sales metrics with detailed insights.',
      options: [
        { 
          name: 'Menu Sales - VMA Only', 
          icon: 'ri-bar-chart-2-line', 
          description: 'VMA menu sales data.',
          picture: VmaImage,
        },
        { 
          name: 'Menu Sales - VMA + DMS', 
          icon: 'ri-line-chart-line', 
          description: 'Combined VMA and DMS data, Pro-Tip: Use the unverified & CP Only Filter for VMA only data with a CPRO Count', // Added comma
          picture: VmaDmsImage, // Corrected to match import
        },
      ],
    },
    {
      title: 'BG Reports',
      icon: 'ri-contrast-drop-2-line',
      summary: 'BG Specific Reporting including Commissions and Revenue reports.',
      options: [
        { 
          name: 'BG Commissions', 
          icon: 'ri-wallet-line', 
          description: 'BG Commissions, Configure in the Incentive / Revenue Area',
          picture: CommissionsImage,
        },
        { 
          name: 'BG Revenue', 
          icon: 'ri-money-dollar-box-line', 
          description: 'BG Revenue report, Configure in the Incentive / Revenue Area', // Added comma
          picture: RevenueImage,
        },
        { 
          name: 'Basic BG Op Code Penetration', 
          icon: 'ri-oil-line', 
          description: 'Uses the BG Labor OP category for a basic CPRO QTY sold Report', // Added comma
          // No picture specified
        },
      ],
    },
    {
      title: 'Prebuilt DMS Reports',
      icon: 'ri-database-2-line',
      summary: 'Match DMS report data with custom filters.',
      options: [
        { 
          name: 'Effective Labor Rate', 
          icon: 'ri-calculator-line', 
          description: '3606 Reynolds & Reynolds Report',
          picture: EffectiveLaborRateImage,
        },
        { 
          name: 'Advisor Performance Report', 
          icon: 'ri-user-star-line', 
          description: '3606 Reynolds & Reynolds Report', // Added comma
          picture: AdvisorPerformanceReportRRImage,
        },
        { 
          name: 'Advisor Performance - CP', 
          icon: 'ri-user-follow-line', 
          description: 'Basic Advisor Performance Report with KPIs', // Added comma
          picture: AdvisorPerformanceCPImage,
        },
        { 
          name: 'OP Code Analysis Report - CP / ADV - OP', 
          icon: 'ri-table-fill', 
          description: 'Basic Advisor OP code Report', // Added comma
          picture: OPCodeAnalysisReportImage,
        },
        { 
          name: 'RAP Report', 
          icon: 'ri-file-chart-2-line', 
          description: 'Advisor performance Grouped by Pay type', // Added comma
          picture: RAPReportImage,
        },
        { 
          name: 'SA-Class Report', 
          icon: 'ri-bar-chart-grouped-line', 
          description: 'CDK SA-CLASS Report - Basic DMS sales report', // Added comma
          picture: SAClassImage,
        },
      ],
    },
    {
      title: 'Retention Reports',
      icon: 'ri-user-follow-line',
      summary: 'Analyze customer retention trends over time.',
      options: [
        { 
          name: 'Retention Report', 
          icon: 'ri-group-line', 
          description: 'Customer retention insights.',
          // picture: RetentionImage, // Missing from your directory; commented out
        },
      ],
    },
    {
      title: 'Legacy SmartVMA Reports',
      icon: 'ri-history-line',
      summary: 'Access legacy some of your old favorites.',
      options: [
        { 
          name: 'Custom - Legacy: Sales Report - DMS', 
          icon: 'ri-file-chart-line', 
          description: 'Sales Report - DMS | Manager log in report for legacy sites', // Added comma
          picture: LegacySaleReportDMSImage,
        },
        { 
          name: 'Custom - Legacy: Sales by Opcode', 
          icon: 'ri-file-list-3-line', 
          description: 'Sales by operation code.', // Added comma
          picture: LegacySalesByOpcodeImage,
        },
      ],
    },
  ];

  const handleMouseEnter = (index) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setOpenCard({ index, openedBy: 'hover' });
    }, 500);
  };

  const handleMouseLeave = (index) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    if (openCard && openCard.index === index && openCard.openedBy === 'hover') {
      setOpenCard(null);
    }
  };

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

  useEffect(() => {
    setTimeout(() => {
      document.querySelector('.modal-content').classList.add('open');
    }, 10);
  }, []);

  const handleSelectReport = (reportTitle, option) => {
    console.log(`Selected: ${option} from ${reportTitle}`);
    setOpenCard(null);
    setHoveredOption(null);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>New Report</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        <div className="modal-section no-border">
          <h3>Start From Scratch</h3>
        </div>
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
                      onMouseEnter={() => option.picture && setHoveredOption({ reportIndex: 0, optionIndex: optIndex })}
                      onMouseLeave={() => setHoveredOption(null)}
                    >
                      <i className={option.icon}></i>
                      <div className="dropdown-item-content">
                        <span>{option.name}</span>
                        <p>{option.description}</p>
                      </div>
                      {hoveredOption && 
                        hoveredOption.reportIndex === 0 && 
                        hoveredOption.optionIndex === optIndex && 
                        option.picture && (
                          <div className="hover-picture">
                            <img 
                              src={option.picture} 
                              alt={option.name} 
                              onError={(e) => console.error(`Failed to load image: ${option.name}`)} 
                            />
                          </div>
                        )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="modal-section">
          <h3>Choose a Prebuilt Template</h3>
          <div className="grid-container">
            {reports.slice(1).map((report, index) => (
              <div
                key={index}
                className={`grid-item ${openCard?.index === index + 1 ? 'open' : ''} ${
                  (index % 3) === 2 ? 'right-column' : ''
                }`}
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
                        onMouseEnter={() => option.picture && setHoveredOption({ reportIndex: index + 1, optionIndex: optIndex })}
                        onMouseLeave={() => setHoveredOption(null)}
                      >
                        <i className={option.icon}></i>
                        <div className="dropdown-item-content">
                          <span>{option.name}</span>
                          <p>{option.description}</p>
                        </div>
                        {hoveredOption && 
                          hoveredOption.reportIndex === index + 1 && 
                          hoveredOption.optionIndex === optIndex && 
                          option.picture && (
                            <div className="hover-picture">
                              <img 
                                src={option.picture} 
                                alt={option.name} 
                                onError={(e) => console.error(`Failed to load image: ${option.name}`)} 
                              />
                            </div>
                          )}
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