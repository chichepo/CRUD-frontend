import React from 'react';

const RentalPricesTableComponent = ({ prices, setSelectedPrice }) => {
  return (
    <table>
      <thead>
        <tr>
          {/* Add your column headers here */}
          {/* For example: */}
          <th>RentalPriceID</th>
          <th>BasicRentalPrice</th>
          {/* Add more headers for other columns */}
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {prices.map((price) => (
          <tr key={price.RentalPriceID}>
            {/* Add your column data here */}
            {/* For example: */}
            <td>{price.RentalPriceID}</td>
            <td>{price.BasicRentalPrice}</td>
            {/* Add more data fields for other columns */}
            <td>
              <button onClick={() => setSelectedPrice(price)}>Edit</button>
              {/* Add Delete functionality here */}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default RentalPricesTableComponent;
