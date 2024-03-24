import React, { useState, useEffect } from 'react';
import { Chart } from 'chart.js/auto';
import { Navbarlogin } from './Navbarlogin';
import axios from 'axios'; // Import axios library for making HTTP requests

function ManagerDashboard() {
  const [activeSection, setActiveSection] = useState('Data Entry');
  
 
  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  return (
    <>
    <Navbarlogin/>
    <div className="dashboard mt-8">
    <div className="headings flex justify-center items-center mb-5 gap-5 space-x-5">
      <button
        className={`
          relative flex items-center py-2 px-4 text-sm leading-6 font-semibold focus:outline-none rounded-md shadow-sm hover:border-green-500 hover:text-green-700
          ${activeSection === 'Data Entry' ? 'bg-green-100 border-b-2 border-green-600' : 'bg-gray-100'}
        `}
        onClick={() => handleSectionChange('Data Entry')}
      >
        Data Entry
        {activeSection === 'Data Entry' && ( // Active state indicator
          <span className="absolute inset-0 bg-gradient-to-br from-green-100 to-gray-100 rounded-full blur-sm opacity-75"></span>
        )}
      </button>
      <button
        className={`
          relative flex items-center py-2 px-4 text-sm leading-6 font-semibold focus:outline-none rounded-md shadow-sm hover:border-green-500 hover:text-green-700
          ${activeSection === 'Reports' ? 'bg-green-100 border-b-2 border-green-600' : 'bg-gray-100'}
        `}
        onClick={() => handleSectionChange('Reports')}
      >
        Reports
        {activeSection === 'Reports' && ( // Active state indicator
          <span className="absolute inset-0 bg-gradient-to-br from-green-100 to-gray-100 rounded-full blur-sm opacity-75"></span>
        )}
      </button>
    </div>
    {activeSection === 'Data Entry' && <DataEntry />}
    {activeSection === 'Reports' && <Reports />}
  </div>
  </>
  );
}


function DataEntry() {
  const [formData, setFormData] = useState({
    date: '',
    weightInPounds: '',
    landfillFee: null,
    buyerRevenue: '',
    category: {
      categoryId: null,
      categoryName: ''
    },
    subCategory: '', // Add subCategory field
    buyer: {
      buyerId: ''
    }
  });

  const [financialYearData, setFinancialYearData] = useState([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       // Make a GET request to the API endpoint
  //       const response = await axios.get('http://localhost:8080/api/summary-report/financial-year');
        
  //       // Assuming the response data is an array
  //       setFinancialYearData(response.data);
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };

  //   fetchData(); // Call the fetchData function when the component mounts
  // }, []); // Empty dependency array ensures this effect runs only once after initial render

  
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevFormData => {
      if (name === 'category') {
        return {
          ...prevFormData,
          [name]: { categoryId: value, categoryName: '' }, // Reset categoryName when category changes
          subCategory: '' // Reset subCategory when category changes
        };
      } else if (name === 'subCategory') {
        return { ...prevFormData, [name]: value };
      } else if (name === 'buyerId') { // Handle buyerId separately
        return {
          ...prevFormData,
          buyer: {
            ...prevFormData.buyer,
            [name]: value
          }
        };
      } else {
        return { ...prevFormData, [name]: value };
      }
    });
  };
  


  // const handleSubmit = async (event) => {
  //   event.preventDefault();
    
  //   try {
  //     const newEntry = {
  //       date: formData.date,
  //       weightInPounds: parseFloat(formData.weightInPounds),
  //       landfillFee: formData.landfillFee,
  //       buyerRevenue: parseFloat(formData.buyerRevenue),
  //       category: formData.category,
  //       subCategory: formData.subCategory,
  //       buyer: { buyerId: parseInt(formData.buyer.buyerId) || null }
  //     };
  
  //     // Make POST request to the API endpoint
  //     const response = await axios.post('http://localhost:8080/api/waste-entries/', newEntry);
  
  //     console.log('POST request successful:', response.data);
      
  //     // Reset form data after successful submission
  //     setFormData({
  //       date: '',
  //       weightInPounds: '',
  //       landfillFee: null,
  //       buyerRevenue: '',
  //       category: {
  //         categoryId: null,
  //         categoryName: ''
  //       },
  //       subCategory: '',
  //       buyer: {
  //         buyerId: ''
  //       }
  //     });
  //   } catch (error) {
  //     console.error('Error submitting data:', error);
  //   }
  // };
  

  const handleSubmit = (event) => {
    event.preventDefault();
    const newEntry = {
      date: formData.date,
      weightInPounds: parseFloat(formData.weightInPounds),
      landfillFee: formData.landfillFee,
      buyerRevenue: parseFloat(formData.buyerRevenue),
      category: formData.category,
      subCategory: formData.subCategory, // Include subCategory in the newEntry object
      buyer: { buyerId: parseInt(formData.buyer.buyerId) || null }
    };
    console.log(newEntry); // You can handle the submission of newEntry here
    setFormData({
      date: '',
      weightInPounds: '',
      landfillFee: null,
      buyerRevenue: '',
      category: {
        categoryId: null,
        categoryName: ''
      },
      subCategory: '', // Reset subCategory
      buyer: {
        buyerId: ''
      }
    });
  };
  
  const renderAdditionalFields = () => {
    switch (formData.category.categoryId) {
      case '1': // Landfill Waste
        return (
          <>
            <label htmlFor="landfillFee" className="block text-gray-700 font-medium mt-4">
              Landfill Fee:
            </label>
            <input
              type="number"
              id="landfillFee"
              name="landfillFee"
              value={formData.landfillFee === null ? '' : formData.landfillFee}
              onChange={handleInputChange}
              className="w-fit rounded-md border border-gray-300 px-3 py-2 text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </>
        );
      case '2': // Compost
        return (
          <>
            {/* Additional fields for Compost */}
          </>
        );
      case '3': // Recyclables
        return (
          <>
            <label htmlFor="subCategory" className="block text-gray-700 font-medium mt-4">
              Sub Waste Type:
            </label>
            <select
              id="subCategory"
              name="subCategory"
              value={formData.subCategory}
              onChange={handleInputChange}
              className="w-fit rounded-md border border-gray-300 px-3 py-2 text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            >
              <option value="">Select Sub Waste Type</option>
              <option value="Cardboard">Cardboard</option>
              <option value="Glass">Glass</option>
              <option value="Paper">Paper</option>
              <option value="Metal">Metal</option>
              <option value="Plastic">#1 PET</option>
              <option value="Plastic">#2 HDPE Colored</option>
              <option value="Plastic">#2 HDPE Natural</option>
            </select>
            <label htmlFor="buyerId" className="block text-gray-700 font-medium mt-4">
              Buyer ID:
            </label>
            <input
              type="number"
              id="buyerId"
              name="buyerId"
              value={formData.buyer.buyerId === null ? '' : formData.buyer.buyerId}
              onChange={handleInputChange}
              required
              className="w-fit rounded-md border border-gray-300 px-3 py-2 text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </>
        );
      default:
        return null;
    }
  };
  
  
    return (
      <div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-1 items-center">
          <label htmlFor="date" className="block text-gray-700 font-medium mt-4">
            Date:
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            required
            className="w-fit rounded-md border border-gray-300 px-3 py-2 text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <label htmlFor="weight" className="block text-gray-700 font-medium mt-4">
            Weight (lbs):
          </label>
          <input
            type="number"
            id="weight"
            name="weightInPounds"
            value={formData.weightInPounds}
            onChange={handleInputChange}
            required
            className="w-fit rounded-md border border-gray-300 px-3 py-2 text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <label htmlFor="type" className="block text-gray-700 font-medium mt-4">
            Type:
          </label>
          <select
            id="type"
            name="category"
            value={formData.category.categoryId}
            onChange={handleInputChange}
            className="w-fit rounded-md border border-gray-300 px-3 py-2 text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
            required
          >
            <option value="">Select Type</option>
            <option value="1">Landfill</option>
            <option value="2">Compost</option>
            <option value="3">Recyclables</option>
          </select>
          {renderAdditionalFields()}
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md mt-6 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-700"
          >
            Submit
          </button>
        </form>
        <h2 className="text-center text-xl font-bold mt-4">Dummy Data Table</h2>
        <table className="w-full table-auto shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-100 text-left text-sm font-medium">
              <th className="px-4 py-2">FY24</th>
              <th className="px-4 py-2">Jul-23</th>
              <th className="px-4 py-2">Aug-23</th>
              <th className="px-4 py-2">Sep-23</th>
              <th className="px-4 py-2">Oct-23</th>
              <th className="px-4 py-2">Nov-23</th>
              <th className="px-4 py-2">Dec-23</th>
              <th className="px-4 py-2">Jan-24</th>
              <th className="px-4 py-2">Feb-24</th>
              <th className="px-4 py-2">Mar-24</th>
              <th className="px-4 py-2">Apr-24</th>
              <th className="px-4 py-2">May-24</th>
              <th className="px-4 py-2">Jun-24</th>
              <th className="px-4 py-2">Item Totals</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-4 py-2">Recycling Revenue</td>
              <td className="px-4 py-2">35.00</td>
              <td className="px-4 py-2">14,057.82</td>
              <td className="px-4 py-2">4,582.22</td>
              <td className="px-4 py-2">18,675.04</td>
              {/* Add more data as needed */}
            </tr>
            <tr>
              <td className="px-4 py-2">Landfill lbs.</td>
              <td className="px-4 py-2">47,845</td>
              <td className="px-4 py-2">75,600</td>
              <td className="px-4 py-2">79,800</td>
              <td className="px-4 py-2">203,245</td>
              {/* Add more data as needed */}
            </tr>
            <tr>
              <td className="px-4 py-2">Compost</td>
              <td className="px-4 py-2">7,100</td>
              <td className="px-4 py-2">10,360</td>
              <td className="px-4 py-2">28,800</td>
              <td className="px-4 py-2">46,260</td>
              {/* Add more data as needed */}
            </tr>
            {/* Add more rows for other data */}
          </tbody>
        </table>
      </div>
    );
    }    


    
    function Reports() {
      const [data, setData] = useState([]);
      const [selectedYear, setSelectedYear] = useState(2023); // Initial selected year
    
      // useEffect(() => {
      //   const fetchData = async () => {
      //     try {
      //       const response = await axios.get('http://localhost:8080/api/summary-report/financial-year');
      //       setYearlyData(response.data);
      //     } catch (error) {
      //       console.error('Error fetching data:', error);
      //     }
      //   };
      //   fetchData();
      // }, []);
    
      // useEffect(() => {
      //   renderPieChart();
      // }, [yearlyData, selectedYear]); // Re-render chart when yearlyData or selectedYear changes


      useEffect(() => {
        // Mock API call (replace with your actual API call)
        // Assume data is fetched from the provided API endpoint
        const fetchData = () => {
          // Your API call to fetch data
          const apiData = [
            {
                "month": "Jan",
                "wasteType": "Landfill Waste",
                "wasteWeight": 15.0,
                "recycledRevenue": null,
                "landfillFee": 30.0,
                "year": 2023
            },
            {
                "month": "Jan",
                "wasteType": "Compost",
                "wasteWeight": 18.0,
                "recycledRevenue": null,
                "landfillFee": 0.0,
                "year": 2023
            },
            {
                "month": "Jan",
                "wasteType": "Cardboard",
                "wasteWeight": 6.0,
                "recycledRevenue": 6.0,
                "landfillFee": null,
                "year": 2024
            },
            {
                "month": "Jan",
                "wasteType": "Glass",
                "wasteWeight": 12.0,
                "recycledRevenue": 12.0,
                "landfillFee": null,
                "year": 2024
            },
            {
                "month": "Jan",
                "wasteType": "Paper",
                "wasteWeight": 72.0,
                "recycledRevenue": 36.0,
                "landfillFee": null,
                "year": 2023
            },
            {
                "month": "Jan",
                "wasteType": "Metal",
                "wasteWeight": 110.0,
                "recycledRevenue": 220.0,
                "landfillFee": null,
                "year": 2024
            },
            {
                "month": "Jan",
                "wasteType": "Plastic",
                "wasteWeight": 90.0,
                "recycledRevenue": 45.0,
                "landfillFee": null,
                "year": 2023
            },
            {
                "month": "Feb",
                "wasteType": "Landfill Waste",
                "wasteWeight": 15.0,
                "recycledRevenue": null,
                "landfillFee": 30.0,
                "year": 2024
            },
            {
                "month": "Feb",
                "wasteType": "Compost",
                "wasteWeight": 18.0,
                "recycledRevenue": null,
                "landfillFee": 0.0,
                "year": 2023
            },
            {
                "month": "Feb",
                "wasteType": "Cardboard",
                "wasteWeight": 6.0,
                "recycledRevenue": 6.0,
                "landfillFee": null,
                "year": 2024
            },
            {
                "month": "Feb",
                "wasteType": "Glass",
                "wasteWeight": 12.0,
                "recycledRevenue": 12.0,
                "landfillFee": null,
                "year": 2023
            },
            {
                "month": "Feb",
                "wasteType": "Paper",
                "wasteWeight": 72.0,
                "recycledRevenue": 36.0,
                "landfillFee": null,
                "year": 2023
            },
            {
                "month": "Feb",
                "wasteType": "Metal",
                "wasteWeight": 80.0,
                "recycledRevenue": 160.0,
                "landfillFee": null,
                "year": 2024
            },
            {
                "month": "Feb",
                "wasteType": "Plastic",
                "wasteWeight": 90.0,
                "recycledRevenue": 45.0,
                "landfillFee": null,
                "year": 2024
            }
        ] 
          setData(apiData);
        };
    
        fetchData();
      }, []); // Fetch data only on initial render
    
      useEffect(() => {
        renderPieChart();
      }, [data, selectedYear]); // Re-render pie chart when data or selected year changes
    
      const renderPieChart = () => {
        const filteredData = data.filter(entry => entry.year === selectedYear);
        const chartData = {
          labels: filteredData.map(entry => entry.wasteType),
          datasets: [{
            label: 'Waste Weightage',
            data: filteredData.map(entry => entry.wasteWeight),
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
          }],
        };
    
        const canvas = document.getElementById('yearlyWasteChart');
        if (canvas) {
          const ctx = canvas.getContext('2d');
          const existingChart = Chart.getChart(ctx);
          if (existingChart) {
            existingChart.destroy(); // Destroy existing chart
          }
          new Chart(ctx, {
            type: 'pie',
            data: chartData,
          });
        }
      };
    
      return (
        <div className="container mx-auto py-8">
          <h2>Sales Report</h2>
          <div className="flex justify-end mb-4">
            <select
              className="px-2 py-1 border border-gray-300 rounded-md"
              value={selectedYear}
              onChange={(e) => setSelectedYear(parseInt(e.target.value))}
            >
              <option value={2023}>2023</option>
              <option value={2024}>2024</option>
              {/* Add more years if needed */}
            </select>
          </div>
          <div className="card rounded-lg shadow-md p-4">
            <h3>Yearly Waste Weightage</h3>
            <canvas id="yearlyWasteChart" />
          </div>
        </div>
      );
    }
  
    
    

export default ManagerDashboard;
