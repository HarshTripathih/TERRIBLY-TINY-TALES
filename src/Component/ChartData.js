import React, { useState } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

function ChartData() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    const response = await axios.get(
      'https://www.terriblytinytales.com/test.txt'
    );
    const text = response.data;
    const words = text.toLowerCase().match(/\b\w+\b/g);
    const frequency = {};
    words.forEach((word) => {
      frequency[word] = frequency[word] || 0;
      frequency[word]++;
    });
    const sortedFrequency = Object.entries(frequency).sort(
      ([, a], [, b]) => b - a
    );
    const topFrequency = sortedFrequency.slice(0, 20);
    setData(topFrequency);
    setIsLoading(false);
  };

  const exportData = () => {
    const csvData = [['Word', 'Occurrences'], ...data];
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      csvData.map((row) => row.join(',')).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'word-frequencies.csv');
    document.body.appendChild(link);
    link.click();
  };

  return (
    <div>
      <button onClick={fetchData} disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Submit'}
      </button>
      {data.length > 0 && (
        <div>
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={data}
                dataKey="1"
                nameKey="0"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label={({ name, value }) => `${name} (${value})`}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <button onClick={exportData}>Export</button>
        </div>
      )}
    </div>
  );
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF1919'];

export default ChartData;