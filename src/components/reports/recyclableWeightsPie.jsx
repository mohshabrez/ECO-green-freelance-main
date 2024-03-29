import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import axios from 'axios';
import 'flatpickr/dist/themes/material_green.css'; // Import flatpickr styles
import flatpickr from 'flatpickr';

function DateFilter({ onChange }) {
  const startDateRef = useRef(null);
  const endDateRef = useRef(null);

  const handleApplyFilter = () => {
    onChange(startDateRef.current.selectedDates[0], endDateRef.current.selectedDates[0]);
  };

  useEffect(() => {
    flatpickr(startDateRef.current, {
      dateFormat: 'Y-m-d',
      onClose: selectedDates => {
        if (selectedDates.length > 0) {
          endDateRef.current.set('minDate', selectedDates[0]);
        }
      }
    });

    flatpickr(endDateRef.current, {
      dateFormat: 'Y-m-d',
      onClose: selectedDates => {
        if (selectedDates.length > 0) {
          startDateRef.current.set('maxDate', selectedDates[0]);
        }
      }
    });
  }, []);

  return (
    <div>
      <input ref={startDateRef} type="text" placeholder="Start Date" className="date-picker" />
      <input ref={endDateRef} type="text" placeholder="End Date" className="date-picker" />
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
