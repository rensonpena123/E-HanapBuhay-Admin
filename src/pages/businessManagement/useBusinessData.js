import { useState, useEffect } from 'react';
import { businessMockData } from './businessData'; 

export const useBusinessData = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 500));

        //  Calculate the Stats dynamically based on the list
        const stats = {
          total: businessMockData.length,
          verified: businessMockData.filter(b => b.status === 'Verified').length,
          pending: businessMockData.filter(b => b.status === 'Pending').length,
          suspended: businessMockData.filter(b => b.status === 'Suspended').length,
        };

        // Return both the Stats and the List
        setData({
          stats: stats,
          businesses: businessMockData
        });

      } catch (error) {
        console.error("Error fetching business data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading };
};