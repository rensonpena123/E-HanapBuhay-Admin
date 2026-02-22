import { useState, useEffect, useRef } from 'react';

export const usePerformanceData = (filters) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const isFirstLoad = useRef(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (isFirstLoad.current) {
          setLoading(true);
          await new Promise(resolve => setTimeout(resolve, 600));
        }

        const originalData = {
          jobStats: {
            totalJobs: 248,
            active: 142,
            pending: 38,
            expired: 15
          },
          topEmployers: [
            { name: 'HSI', value: 130, percent: '59.5%', color: '#facc15' },
            { name: 'Mr. DIY', value: 22, percent: '11.8%', color: '#fef08a' },
            { name: 'Zus Coffee', value: 35, percent: '18.7%', color: '#3b82f6' },
          ],
          hiringStats: {
            totalApplicants: 1246,
            hired: 405,
            pending: 841
          },
          topJobs: [
            { name: 'IT', value: 30, percent: '9.2%', color: '#9ca3af' }, 
            { name: 'Construction', value: 80, percent: '24.5%', color: '#1e3a8a' },
            { name: 'Food Service', value: 50, percent: '15.3%', color: '#facc15' },
            { name: 'Retail', value: 100, percent: '30.6%', color: '#4ade80' },
            { name: 'Healthcare', value: 67, percent: '20.5%', color: '#ef4444' },
          ]
        };

        let filteredData = JSON.parse(JSON.stringify(originalData)); 

        // FILTER BY EMPLOYER 
        if (filters?.employers && filters.employers !== "Any") {
           const selectedEmp = filters.employers;
           filteredData.topEmployers = filteredData.topEmployers.filter(item => item.name === selectedEmp);
           
           filteredData.jobStats = {
             totalJobs: 45,
             active: 30,
             pending: 10,
             expired: 5
           };

           filteredData.hiringStats = {
             totalApplicants: 150,
             hired: 40,
             pending: 110,
           };
        }

        // FILTER BY JOB TYPE 
        if (filters?.jobType && filters.jobType !== "Any") {
           const selectedJob = filters.jobType;
           filteredData.topJobs = filteredData.topJobs.filter(item => item.name === selectedJob);

           filteredData.jobStats = {
             totalJobs: Math.floor(originalData.jobStats.totalJobs * 0.4), 
             active: Math.floor(originalData.jobStats.active * 0.4),
             pending: Math.floor(originalData.jobStats.pending * 0.4),
             expired: Math.floor(originalData.jobStats.expired * 0.4)
           };
        }

        // FILTER BY BARANGAY 
        if (filters?.barangay && filters.barangay !== "Any") {
             filteredData.jobStats = {
                totalJobs: Math.floor(originalData.jobStats.totalJobs * 0.2), 
                active: Math.floor(originalData.jobStats.active * 0.2),
                pending: Math.floor(originalData.jobStats.pending * 0.2),
                expired: 2
             };
             
             filteredData.topEmployers = filteredData.topEmployers.map(item => ({
                 ...item,
                 value: Math.max(1, Math.floor(item.value * 0.2)) 
             }));

             filteredData.hiringStats = {
                  totalApplicants: 85,
                  hired: 12,
                  pending: 73
             };
        }

        // DATE RANGE 
        if (filters?.startDate && filters?.endDate) {
              filteredData.jobStats.totalJobs -= 20; 
              filteredData.hiringStats.totalApplicants -= 50;
        }

        setData(filteredData);
      } catch (error) {
        console.error("Failed to fetch performance data", error);
      } finally {
        setLoading(false);
        // Mark first load as done
        isFirstLoad.current = false;
      }
    };

    fetchData();
  }, [filters]); 

  return { data, loading };
};