import React from 'react';

const MonthlyRevenueTable = () => {
  // const [data, setData] = useState([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch('http://localhost:8080/api/summary-report/financial-year');
  //       if (!response.ok) {
  //         throw new Error('Network response was not ok');
  //       }
  //       const jsonData = await response.json();
  //       setData(jsonData);
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };

  //   fetchData();
  // }, []);
  const data = [
    {
      "month": "Jan-24",
      "wasteType": "Landfill Waste",
      "wasteWeight": 15.0,
      "recycledRevenue": null,
      "landfillFee": 30.0
    },
    {
      "month": "Jan-24",
      "wasteType": "Compost",
      "wasteWeight": 18.0,
      "recycledRevenue": null,
      "landfillFee": 0.0
    },
    {
      "month": "Jan-24",
      "wasteType": "Cardboard",
      "wasteWeight": 6.0,
      "recycledRevenue": 6.0,
      "landfillFee": null
    },
    {
      "month": "Jan-24",
      "wasteType": "Glass",
      "wasteWeight": 12.0,
      "recycledRevenue": 12.0,
      "landfillFee": null
    },
    {
      "month": "Jan-24",
      "wasteType": "Paper",
      "wasteWeight": 72.0,
      "recycledRevenue": 36.0,
      "landfillFee": null
    },
    {
      "month": "Jan-24",
      "wasteType": "Metal",
      "wasteWeight": 110.0,
      "recycledRevenue": 220.0,
      "landfillFee": null
    },
    {
      "month": "Jan-24",
      "wasteType": "Plastic",
      "wasteWeight": 90.0,
      "recycledRevenue": 45.0,
      "landfillFee": null
    },
    {
      "month": "Feb-24",
      "wasteType": "Landfill Waste",
      "wasteWeight": 15.0,
      "recycledRevenue": null,
      "landfillFee": 30.0
    },
    {
      "month": "Feb-24",
      "wasteType": "Compost",
      "wasteWeight": 18.0,
      "recycledRevenue": null,
      "landfillFee": 0.0
    },
    {
      "month": "Feb-24",
      "wasteType": "Cardboard",
      "wasteWeight": 6.0,
      "recycledRevenue": 6.0,
      "landfillFee": null
    },
    {
      "month": "Feb-24",
      "wasteType": "Glass",
      "wasteWeight": 12.0,
      "recycledRevenue": 12.0,
      "landfillFee": null
    },
    {
      "month": "Feb-24",
      "wasteType": "Paper",
      "wasteWeight": 72.0,
      "recycledRevenue": 36.0,
      "landfillFee": null
    },
    {
      "month": "Feb-24",
      "wasteType": "Metal",
      "wasteWeight": 80.0,
      "recycledRevenue": 160.0,
      "landfillFee": null
    },
    {
      "month": "Feb-24",
      "wasteType": "Plastic",
      "wasteWeight": 90.0,
      "recycledRevenue": 45.0,
      "landfillFee": null
    }
  ];

  // Extract unique months and waste types
  const months = [...new Set(data.map(item => item.month))];
  const wasteTypes = [...new Set(data.map(item => item.wasteType))];

  return (
    <table className="w-full table-auto shadow-md rounded-lg">
      <thead>
        <tr className="bg-gray-100 text-left text-sm font-medium">
          <th className="px-4 py-2">Waste Type</th>
          {/* Generate columns for each month */}
          {months.map(month => (
            <th key={month} className="px-4 py-2">{month}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {/* Iterate through each waste type */}
        {wasteTypes.map(wasteType => (
          <tr key={wasteType}>
            <td className="px-4 py-2">{wasteType}</td>
            {/* Iterate through each month for the current waste type */}
            {months.map(month => {
              // Find the data entry for the current month and waste type
              const entry = data.find(item => item.month === month && item.wasteType === wasteType);
              return (
                <td key={`${wasteType}-${month}`} className="px-4 py-2">
                  {/* Display waste weight, recycled revenue, and landfill fee */}
                  {entry ? (
                    <div>
                      <div>{entry.wasteWeight}</div>
                      {/* <div>Recycled Revenue: {entry.recycledRevenue !== null ? entry.recycledRevenue : 'N/A'}</div> */}
                      {/* <div>Landfill Fee: {entry.landfillFee !== null ? entry.landfillFee : 'N/A'}</div> */}
                    </div>
                  ) : 'N/A'}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MonthlyRevenueTable;
