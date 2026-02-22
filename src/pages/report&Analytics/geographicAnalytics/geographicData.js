import { useState, useEffect, useRef } from 'react';

export const useGeographicData = (filters) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const isFirstLoad = useRef(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (isFirstLoad.current) {
          setLoading(true);
          await new Promise(resolve => setTimeout(resolve, 800));
        }

        const originalData = {
          jobPosts: [
            { name: 'Plainview', value: 10, percent: '23.3%' },
            { name: 'Highway Hills', value: 20, percent: '46.5%' },
            { name: 'Wack-Wack', value: 2, percent: '2.3%' },
            { name: 'Hulo', value: 5, percent: '9.3%' },
            { name: 'Addition Hills', value: 8, percent: '18.6%' },
          ],
          applicants: [
            { name: 'Addition Hills', value: 1860, color: '#2dd4bf' }, 
            { name: 'Highway Hills', value: 1190, color: '#facc15' },
            { name: 'Plainview', value: 730, color: '#f87171' },   
            { name: 'Wack-Wack', value: 780, color: '#ef4444' },
          ],
          engagement: [
            { rank: 1, name: 'Highway Hills', sessions: 30, time: '8.2 min', status: 'High' },
            { rank: 2, name: 'Barangay Plainview', sessions: 15, time: '7.0 min', status: 'High' },
            { rank: 3, name: 'Barangay Addition Hills', sessions: 20, time: '3.5 min', status: 'Moderate' },
            { rank: 4, name: 'Highway Hulo', sessions: 10, time: '2.8 min', status: 'Moderate' },
            { rank: 5, name: 'Wack-wack Greenhills', sessions: 4, time: '1.3 min', status: 'Low' },
          ]
        };

        let filteredData = JSON.parse(JSON.stringify(originalData));

        //  FILTER BY BARANGAY 
        if (filters?.barangay && filters.barangay !== "Any") {
           const selected = filters.barangay;
           filteredData.jobPosts = filteredData.jobPosts.filter(item => item.name.includes(selected));
           filteredData.applicants = filteredData.applicants.filter(item => item.name.includes(selected));
           filteredData.engagement = filteredData.engagement.filter(item => item.name.includes(selected));
        }

        // FILTER BY EMPLOYER (Simulated Connection) 
        if (filters?.employers && filters.employers !== "Any") {
            filteredData.jobPosts = filteredData.jobPosts.map(item => ({
                ...item,
                value: Math.floor(item.value * 0.4) 
            })).filter(item => item.value > 0);
        }

        // FILTER BY JOB TYPE (Simulated Connection) 
        if (filters?.jobType && filters.jobType !== "Any") {
             filteredData.jobPosts = filteredData.jobPosts.filter((_, index) => index % 2 === 0);
        }

        setData(filteredData);
      } catch (error) {
        console.error("Failed to fetch geographic data", error);
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