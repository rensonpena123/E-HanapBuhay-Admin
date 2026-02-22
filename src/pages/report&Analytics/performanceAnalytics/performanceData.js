import { useState, useEffect } from 'react';

export const usePerformanceData = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // --- REAL DATABASE VERSION (Uncomment later) ---
        // const response = await fetch('/api/analytics/performance');
        // const result = await response.json();
        // setData(result);

        // --- MOCK DATA VERSION ---
        await new Promise(resolve => setTimeout(resolve, 1200)); 

        const mockData = {
          // Left Chart: Top Employers
          topEmployers: [
            { name: 'HSI', value: 130, percent: '59.5%', color: '#facc15' }, // Yellow
            { name: 'Mr. DIY', value: 22, percent: '11.8%', color: '#fef08a' }, // Light Yellow
            { name: 'Zus Coffee', value: 35, percent: '18.7%', color: '#3b82f6' }, // Blue
          ],
          
          // Top Right Cards: Hiring Stats
          hiringStats: {
            totalApplicants: 1246,
            hired: 405,
            pending: 841
          },

          // Bottom Right Chart: Top Jobs
          topJobs: [
            { name: 'IT', value: 30, percent: '9.2%', color: '#9ca3af' }, // Gray
            { name: 'Security', value: 100, percent: '30.6%', color: '#1e3a8a' }, // Dark Blue
            { name: 'Manufacturing', value: 80, percent: '24.5%', color: '#4ade80' }, // Green
            { name: 'Cashier', value: 50, percent: '15.3%', color: '#facc15' }, // Yellow
            { name: 'Man Power', value: 67, percent: '20.5%', color: '#ef4444' }, // Red
          ]
        };

        setData(mockData);
      } catch (error) {
        console.error("Failed to fetch performance data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading };
};