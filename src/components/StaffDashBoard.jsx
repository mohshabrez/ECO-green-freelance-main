import React, { useState, useEffect } from 'react';
import { Navbarlogin } from './Navbarlogin';

function StaffDashBoard() {

  return (
    <>
    <Navbarlogin/>
    <div className="dashboard mt-8">
    <div className="headings flex justify-center items-center mb-5 gap-5 space-x-5">
      <button
        className={`
          relative flex items-center py-2 px-4 text-sm leading-6 font-semibold focus:outline-none rounded-md shadow-sm hover:border-green-500 hover:text-green-700
          ${'bg-green-100 border-b-2 border-green-600'}
        `}
      >
        Data Entry
      </button>
      
    </div>
    <DataEntry />
    
  </div>
  </>
  );
}


function DataEntry() {
  const [formData, setFormData] = useState({
    date: '2024-02-01',
    weightInPounds: 10.00,
    landfillFee: null,
    buyerRevenue: 5.00,
    category: {
      categoryId: null,
    },
    buyer: {
      buyerId: 2,
    },
  });

  const categoryData = [
    {
      "category_id": 1,
      "category_name": "Landfill Waste",
      "sub_waste_type": "Landfill Waste",
      "waste_type": "Landfill Waste"
    },
    {
      "category_id": 2,
      "category_name": "Compost",
      "sub_waste_type": "Compost",
      "waste_type": "Compost"
    },
    {
      "category_id": 3,
      "category_name": "Recyclables",
      "sub_waste_type": "Cardboard",
      "waste_type": "Cardboard"
    },
    {
      "category_id": 4,
      "category_name": "Recyclables",
      "sub_waste_type": "Glass",
      "waste_type": "Glass"
    },
    {
      "category_id": 5,
      "category_name": "Recyclables",
      "sub_waste_type": "Mixed Paper",
      "waste_type": "Paper"
    },
    {
      "category_id": 6,
      "category_name": "Recyclables",
      "sub_waste_type": "Newspaper",
      "waste_type": "Paper"
    },
    {
      "category_id": 7,
      "category_name": "Recyclables",
      "sub_waste_type": "White Office",
      "waste_type": "Paper"
    },
    {
      "category_id": 8,
      "category_name": "Recyclables",
      "sub_waste_type": "Aluminum",
      "waste_type": "Metal"
    },
    {
      "category_id": 9,
      "category_name": "Recyclables",
      "sub_waste_type": "Food cans",
      "waste_type": "Metal"
    },
    {
      "category_id": 10,
      "category_name": "Recyclables",
      "sub_waste_type": "Scrap metal",
      "waste_type": "Metal"
    },
    {
      "category_id": 11,
      "category_name": "Recyclables",
      "sub_waste_type": "#1 PET",
      "waste_type": "Plastic"
    },
    {
      "category_id": 12,
      "category_name": "Recyclables",
      "sub_waste_type": "#2 HDPE Colored",
      "waste_type": "Plastic"
    },
    {
      "category_id": 13,
      "category_name": "Recyclables",
      "sub_waste_type": "#2 HDPE Natual",
      "waste_type": "Plastic"
    }
  ]

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
  
    if (name === 'category') {
      const selectedCategory = categoryData.find(cat => cat.category_id === parseInt(value));
      
      setFormData(prevFormData => ({
        ...prevFormData,
        category: { categoryId: selectedCategory.category_id },
        subCategory: '' // Reset subCategory when category changes
      }));
    } else if (name === 'subCategory') {
      setFormData(prevFormData => ({
        ...prevFormData,
        [name]: value
      }));
    } else if (name === 'buyerId') {
      setFormData(prevFormData => ({
        ...prevFormData,
        buyer: {
          ...prevFormData.buyer,
          buyerId: value
        }
      }));
    } else {
      setFormData(prevFormData => ({
        ...prevFormData,
        [name]: value
      }));
    }
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
      landfillFee: formData.category.categoryName === 'Landfill Waste' ? formData.landfillFee : null,
      buyerRevenue: parseFloat(formData.buyerRevenue),
      category: formData.category,
      subCategory: formData.category.categoryName === 'Recyclables' ? formData.subCategory : '',
      buyer: { buyerId: parseInt(formData.buyer.buyerId) || null }
    };
    console.log(newEntry);
    setFormData({
      date: '',
      weightInPounds: '',
      landfillFee: null,
      buyerRevenue: '',
      category: {
        categoryId: null,
        categoryName: ''
      },
      subCategory: '',
      buyer: {
        buyerId: ''
      }
    });
  };
  
  const renderSubCategories = () => {
    const selectedCategory = categoryData.find(cat => cat.category_id === parseInt(formData.category.categoryId));
    if (selectedCategory) {
      switch (selectedCategory.category_name) {
        case 'Landfill Waste':
          return (
            <label htmlFor="landfillFee" className="block text-gray-700 font-medium mt-4">
              Landfill Fee:
              <input
                type="number"
                id="landfillFee"
                name="landfillFee"
                value={formData.landfillFee === null ? '' : formData.landfillFee}
                onChange={handleInputChange}
                className="w-fit rounded-md border border-gray-300 px-3 py-2 text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </label>
          );
        case 'Recyclables':
          return (
            <>
            <label htmlFor="buyerId" className="block text-gray-700 font-medium mt-4">
        Buyer ID:
        <input
          type="number"
          id="buyerId"
          name="buyerId"
          value={formData.buyer.buyerId === null ? '' : formData.buyer.buyerId}
          onChange={handleInputChange}
          required
          className="w-fit rounded-md border border-gray-300 px-3 py-2 text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </label>
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
                {categoryData.filter(cat => cat.category_name === 'Recyclables').map(cat => (
                  <option key={cat.category_id} value={cat.sub_waste_type}>{cat.sub_waste_type}</option>
                ))}
              </select>
              
            </>
          );
        default:
          return null;
      }
    } else {
      return null;
    }
  };
  
  
  
    return (
      <div>

<div className="flex justify-center items-center h-full">
  <div className="container mx-auto py-8">
    <h2 className="text-center">Enter Waste Data</h2>
    <form onSubmit={handleSubmit} className="mt-4">
      <label htmlFor="date" className="block text-gray-700 font-medium">
        Date:
        <input
          type="date"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleInputChange}
          className="w-fit rounded-md border border-gray-300 px-3 py-2 text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
          required
        />
      </label>
      <label htmlFor="weightInPounds" className="block text-gray-700 font-medium mt-4">
        Weight (in pounds):
        <input
          type="number"
          id="weightInPounds"
          name="weightInPounds"
          value={formData.weightInPounds}
          onChange={handleInputChange}
          className="w-fit rounded-md border border-gray-300 px-3 py-2 text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
          required
        />
      </label>
      <label htmlFor="category" className="block text-gray-700 font-medium mt-4">
        Category:
        <select
          id="category"
          name="category"
          value={formData.category.categoryId || ''}
          onChange={handleInputChange}
          className="w-fit rounded-md border border-gray-300 px-3 py-2 text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
          required
        >
          <option value="">Select Category</option>
          {categoryData.map(cat => (
            <option key={cat.category_id} value={cat.category_id}>{cat.category_name}</option>
          ))}
        </select>
      </label>
      {renderSubCategories()}
      
      <button type="submit" className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
        Submit
      </button>
    </form>
  </div>
</div>



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
   

export default StaffDashBoard;
