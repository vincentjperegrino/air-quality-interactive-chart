import { useState, useEffect } from 'react';
import axios from 'axios';
import { AirQualityData } from '../types/data';
import { BASE_URL } from '../lib/contants';

const API_URL = `${BASE_URL}/data`;

export const useAirQualityData = (parameter: string, startDate?: Date, endDate?: Date) => {
  const [data, setData] = useState<AirQualityData[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!parameter) return;
      
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (startDate) params.append('startDate', startDate.toISOString());
        if (endDate) params.append('endDate', endDate.toISOString());
        
        const response = await axios.get<AirQualityData[]>(`${API_URL}?parameter=${parameter}`, { params });
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [parameter, startDate, endDate]);

  return { data, loading };
};