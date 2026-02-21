import { useState, useEffect } from 'react';

export const useGeographicData = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // --- REAL DATABASE VERSION (Uncomment later) ---
        // const response = await fetch('/api/analytics/geographic');
        // const result = await response.json();
        // setData(result);

        // --- MOCK DATA VERSION (Current) ---
        await new Promise(resolve => setTimeout(resolve, 1000));

        const mockData = {
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

        setData(mockData);
      } catch (error) {
        console.error("Failed to fetch geographic data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading };
};