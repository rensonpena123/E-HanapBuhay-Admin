import React from 'react';
import { FileText, FileSpreadsheet } from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'; 
import * as XLSX from 'xlsx';

import { usePerformanceData } from './performanceAnalytics/performanceData.js';
import { useGeographicData } from './geographicAnalytics/geographicData.js';

const DataExport = () => {
  const { data: geoData } = useGeographicData();
  const { data: perfData } = usePerformanceData();

  // PDF download
  const handleDownloadPDF = () => {
    if (!geoData || !perfData) return alert("Wait for data to load...");
    
    const doc = new jsPDF();

    // -- Header --
    doc.setFontSize(18);
    doc.text("E-HanapBuhay Comprehensive Report", 14, 20);
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(`Generated: ${new Date().toLocaleDateString()}`, 14, 28);

    // Performance analytics
    doc.setFontSize(14);
    doc.setTextColor(0);
    doc.text("1. Performance Analytics", 14, 40);

    // Table 1A: Hiring Stats
    autoTable(doc, {
      startY: 45,
      head: [['Metric', 'Count']],
      body: [
        ['Total Applicants', perfData.hiringStats.totalApplicants],
        ['Hired Candidates', perfData.hiringStats.hired],
        ['Pending Reviews', perfData.hiringStats.pending],
      ],
      theme: 'grid',
      headStyles: { fillColor: [26, 38, 62] }
    });

    // Table 1B: Top Employers 
    let finalY = doc.lastAutoTable.finalY + 10;
    doc.text("Top Employers", 14, finalY);
    
    autoTable(doc, {
      startY: finalY + 5,
      head: [['Employer Name', 'Hires', 'Percentage']],
      body: perfData.topEmployers.map(item => [item.name, item.value, item.percent]),
      theme: 'striped',
      headStyles: { fillColor: [234, 179, 8] } 
    });

    // Table 1C: Top Jobs
    finalY = doc.lastAutoTable.finalY + 10;
    doc.text("Top Job Categories", 14, finalY);

    autoTable(doc, {
      startY: finalY + 5,
      head: [['Job Category', 'Count', 'Percentage']],
      body: perfData.topJobs.map(item => [item.name, item.value, item.percent]),
      theme: 'striped',
      headStyles: { fillColor: [234, 179, 8] }
    });

    // SECTION 2: GEOGRAPHIC ANALYTICS 
    if (doc.lastAutoTable.finalY > 200) {
      doc.addPage();
      finalY = 20;
    } else {
      finalY = doc.lastAutoTable.finalY + 20;
    }

    doc.setFontSize(14);
    doc.text("2. Geographic Analytics", 14, finalY);

    // Table 2A: Job Posts per Barangay
    autoTable(doc, {
      startY: finalY + 5,
      head: [['Barangay', 'Job Posts', 'Share']],
      body: geoData.jobPosts.map(item => [item.name, item.value, item.percent]),
      theme: 'grid',
      headStyles: { fillColor: [26, 38, 62] }
    });

    // Table 2B: Applicant Distribution
    finalY = doc.lastAutoTable.finalY + 10;
    doc.text("Applicant Distribution", 14, finalY);

    autoTable(doc, {
      startY: finalY + 5,
      head: [['Barangay', 'Registered Applicants']],
      body: geoData.applicants.map(item => [item.name, item.value]),
      theme: 'striped',
      headStyles: { fillColor: [26, 38, 62] }
    });

    // Table 2C: Detailed Engagement
    finalY = doc.lastAutoTable.finalY + 10;
    doc.text("Barangay Engagement Details", 14, finalY);

    autoTable(doc, {
      startY: finalY + 5,
      head: [['Rank', 'Barangay', 'Sessions', 'Avg Time', 'Status']],
      body: geoData.engagement.map(row => [
        row.rank, row.name, row.sessions, row.time, row.status
      ]),
      theme: 'striped',
      headStyles: { fillColor: [250, 204, 21] }, 
      styles: { textColor: 50 }
    });

    doc.save('E-HanapBuhay-Full-Report.pdf');
  };

  //  FULL EXCEL DOWNLOAD 
  const handleDownloadExcel = () => {
    if (!geoData || !perfData) return alert("Wait for data to load...");

    const wb = XLSX.utils.book_new();

    // Sheet 1: Performance
    const perfSheet = [
      ...perfData.topEmployers.map(i => ({ Category: "Top Employer", Name: i.name, Value: i.value, Percent: i.percent })),
      ...perfData.topJobs.map(i => ({ Category: "Top Job", Name: i.name, Value: i.value, Percent: i.percent })),
      { Category: "Hiring Stats", Name: "Total Applicants", Value: perfData.hiringStats.totalApplicants, Percent: "-" },
      { Category: "Hiring Stats", Name: "Hired", Value: perfData.hiringStats.hired, Percent: "-" },
    ];
    const ws1 = XLSX.utils.json_to_sheet(perfSheet);
    XLSX.utils.book_append_sheet(wb, ws1, "Performance");

    // Sheet 2: Geographic
    const geoSheet = [
        ...geoData.jobPosts.map(i => ({ Type: "Job Post", Location: i.name, Count: i.value })),
        ...geoData.applicants.map(i => ({ Type: "Applicant", Location: i.name, Count: i.value })),
    ];
    const ws2 = XLSX.utils.json_to_sheet(geoSheet);
    XLSX.utils.book_append_sheet(wb, ws2, "Geographic Stats");

    // Sheet 3: Engagement Table
    const engagementSheet = geoData.engagement.map(item => ({
      Rank: item.rank,
      Barangay: item.name,
      Sessions: item.sessions,
      "Avg Time": item.time,
      Status: item.status
    }));
    const ws3 = XLSX.utils.json_to_sheet(engagementSheet);
    XLSX.utils.book_append_sheet(wb, ws3, "Engagement Details");

    XLSX.writeFile(wb, "E-HanapBuhay-Full-Data.xlsx");
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-200 mt-6 mb-10">
      <div className="bg-[#1a263e] p-4">
        <h2 className="text-white text-lg font-bold">Data Export</h2>
      </div>

      <div className="p-8 bg-gray-50 flex flex-col md:flex-row gap-6 justify-center items-center">
        
        {/* PDF Button */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 w-full md:w-80 flex flex-col items-center text-center">
          <div className="bg-red-50 p-3 rounded-full mb-4">
            <FileText className="text-red-500" size={32} />
          </div>
          <h3 className="font-bold text-gray-800 text-lg">PDF Reports</h3>
          <p className="text-gray-500 text-sm mb-6">Generate full report as PDF</p>
          <button 
            onClick={handleDownloadPDF}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded-lg w-full transition-colors shadow-md cursor-pointer"
          >
            Download as PDF
          </button>
        </div>

        {/* Excel Button */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 w-full md:w-80 flex flex-col items-center text-center">
          <div className="bg-green-50 p-3 rounded-full mb-4">
            <FileSpreadsheet className="text-green-600" size={32} />
          </div>
          <h3 className="font-bold text-gray-800 text-lg">Excel Reports</h3>
          <p className="text-gray-500 text-sm mb-6">Generate full data as Excel</p>
          <button 
            onClick={handleDownloadExcel}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg w-full transition-colors shadow-md cursor-pointer"
          >
            Download as Excel
          </button>
        </div>

      </div>
    </div>
  );
};

export default DataExport;