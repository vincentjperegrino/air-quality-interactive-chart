import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { AirQualityData } from '../types/data';

interface AirQualityChartProps {
  data: AirQualityData[];
  parameter: string;
}

export const AirQualityChart = ({ data, parameter }: AirQualityChartProps) => (
  <ResponsiveContainer width="100%" height={400}>
    <LineChart data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis 
        dataKey="date_time" 
        tickFormatter={(time) => new Date(time).toLocaleDateString()}
      />
      <YAxis />
      <Tooltip 
        labelFormatter={(time) => new Date(time).toLocaleString()}
        formatter={(value) => [Number(value).toFixed(2), parameter.toUpperCase()]}
      />
      <Line 
        type="monotone" 
        dataKey={parameter} 
        stroke="#8884d8" 
        dot={false}
      />
    </LineChart>
  </ResponsiveContainer>
);