import { useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import Spinner from "./Spinner";
import './TextDataParser.css';

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#AF19FF",
  "#FF1919",
];

const TextDataParser = () => {
  const [histogramData, setHistogramData] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const fetchHistogramData = async () => {
    if (!url) {
      setErrorMessage("Please enter a URL");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.get(url);
      const words = response.data.toLowerCase().match(/\b\w+\b/g);
      const wordCounts = {};
      const frequency = {};

      words.forEach((word) => {
        wordCounts[word] = (wordCounts[word] || 0) + 1;
        frequency[word] = frequency[word] || 0;
        frequency[word]++;
      });

      const sortedWordCounts = Object.entries(wordCounts).sort(
        ([, count1], [, count2]) => count2 - count1
      );
      const sortedFrequency = Object.entries(frequency).sort(
        ([, a], [, b]) => b - a
      );
      const top20WordCounts = sortedWordCounts
        .slice(0, 20)
        .map(([word, count]) => ({
          word,
          count,
        }));
      const topFrequency = sortedFrequency.slice(0, 20);
      setData(topFrequency);
      setHistogramData(top20WordCounts);
      setErrorMessage("");
      setLoading(false);
    } catch (error) {
      console.error(error);
      setErrorMessage("Error fetching data. Please check the URL and try again.");
      setLoading(false);
    }
  };

  const handleExport = () => {
    if (!url) {
      setErrorMessage("Please enter a URL");
      return;
    }
    const csvContent =
      "data:text/csv;charset=utf-8," +
      histogramData.map(({ word, count }) => `${word},${count}`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "histogram.csv");
    document.body.appendChild(link);
    link.click();
    setErrorMessage("");
  };

  const handleUrlChange = (event) => {
    setUrl(event.target.value);
    setErrorMessage("");
  };

  return (
    <div >
      <div >
        <div class="d-flex" style={{alignItems:'center',display:'flex',justifyContent:'center'}}>
          <input style={{width:'80vw',height:'6vh',border:'1px solid black'}} value={url} onChange={handleUrlChange} class="form-control me-2" type="search" placeholder="Enter the URL.." aria-label="Search" />
          <button style={{width:"8vw",height:"6vh",fontSize:"30px"}} class="btn btn-dark" onClick={fetchHistogramData}>{loading && <Spinner />}Submit</button>
        </div>
        {loading && <Spinner />}
        
        {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
        {histogramData && (
          <div>
            <BarChart width={600} height={400} data={histogramData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" />
              <XAxis dataKey="word" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
            <button class="btn btn-dark" onClick={handleExport}>Export</button>
            <h4>Download <mark style={{ backgroundColor: "yellow" }}>.CSV</mark>File</h4>
          </div>
        )}
      </div>
      <div>
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
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
};

export default TextDataParser;