import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function DateFilter({ onChange }) {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleApplyFilter = () => {
    onChange(startDate, endDate);
  };

  return (
    <div>
      <DatePicker
       className="date-picker"
        selected={startDate ? new Date(startDate) : null}
        onChange={date => setStartDate(date ? date.toISOString().split('T')[0] : '')}
        selectsStart
        startDate={startDate ? new Date(startDate) : null}
        endDate={endDate ? new Date(endDate) : null}
        placeholderText="Start Date"
      />
      <DatePicker
       className="date-picker"
        selected={endDate ? new Date(endDate) : null}
        onChange={date => setEndDate(date ? date.toISOString().split('T')[0] : '')}
        selectsEnd
        startDate={startDate ? new Date(startDate) : null}
        endDate={endDate ? new Date(endDate) : null}
        minDate={startDate ? new Date(startDate) : null}
        placeholderText="End Date"
      />
      <button className="apply-button" onClick={handleApplyFilter}>Apply</button>
    </div>
  );
}

function RecyclableWeightsPie() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleDateFilterChange = (start, end) => {
    setStartDate(start);
    setEndDate(end);
  };
  console.log(startDate,endDate)
  return (
    <div>
      <h1>Recyclable Weight Percentage</h1>
      <DateFilter onChange={handleDateFilterChange} />
      <MainComponent startDate={startDate} endDate={endDate} />
    </div>
  );
}



function MainComponent({ startDate, endDate }) {
  const [recyclableData, setRecyclableData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/summary-report/recyclable-weight?startDate=${startDate}&endDate=${endDate}`);
        setRecyclableData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [startDate, endDate]);

  useEffect(() => {
    renderPieChart();
  }, [recyclableData]); // Re-render pie chart when recyclableData changes

  const renderPieChart = () => {
    const chartData = {
      labels: recyclableData.map(entry => entry.recyclableType),
      datasets: [{
        label: 'Weight Percentage',
        data: recyclableData.map(entry => entry.weightPercentage),
        backgroundColor: [
          'rgba(255, 99, 132, 0.7)',
          'rgba(54, 162, 235, 0.7)',
          'rgba(255, 206, 86, 0.7)',
          'rgba(75, 192, 192, 0.7)',
          'rgba(153, 102, 255, 0.7)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
      }],
    };

    const canvas = document.getElementById('recyclableWeightPieChart');
    if (canvas) {
      const ctx = canvas.getContext('2d');
      const existingChart = Chart.getChart(ctx);
      if (existingChart) {
        existingChart.destroy(); // Destroy existing chart
      }
      new Chart(ctx, {
        type: 'pie',
        data: chartData,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'bottom',
            },
            title: {
              display: true,
              text: 'Recyclable Weight Percentage',
            },
          },
        },
      });
    }
  };

  return <canvas id="recyclableWeightPieChart" />;
}

export default RecyclableWeightsPie;
