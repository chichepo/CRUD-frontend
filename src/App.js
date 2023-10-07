//app.js
import React, { useState, useEffect } from 'react';
import AppBarComponent from './components/AppBarComponent';
import TableComponent from './components/TableComponent';
import CitiesTableComponent from './components/CitiesTableComponent';

const menuItems = [
  'Cities',
  'Projects',
  'Buildings',
  'ApartmentTypes',
  'Apartments',
  'RentalPrices',
  'ExternalParameters',
];

const getDefaultMenuItem = () => menuItems[0]; // Set the default menu item here

const App = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState(getDefaultMenuItem());
  const [apiEndpoint, setApiEndpoint] = useState('/api/cities'); // Initialize with a default value

  const handleMenuClick = (menuItem) => {
    setSelectedMenuItem(menuItem);

    switch (menuItem) {
      case 'Cities':
        setApiEndpoint('/api/cities');
        break;
      case 'Projects':
        setApiEndpoint('/api/projects');
        break;
      // Add cases for other menu items as needed
      default:
        setApiEndpoint('/api/cities'); // Set a default if needed
        break;
    }

    console.log('Selected Menu Item:', menuItem);
    console.log('Constructed API Endpoint:', apiEndpoint);
  };

  const renderSelectedComponents = () => {
    if (!selectedMenuItem || !formsAndTables[selectedMenuItem]) {
      return null;
    }

    const { form, table } = formsAndTables[selectedMenuItem];

    return (
      <div key={selectedMenuItem}>
        <h2>{selectedMenuItem} Management</h2>
        {form}
        {table}
      </div>
    );
  };

  const formsAndTables = menuItems.reduce((acc, menuItem) => {
    acc[menuItem] = {
      table: <TableComponent tableType={menuItem} />,
    };
    return acc;
  }, {});

  console.log('apiEndpoint in App.js:', apiEndpoint);
  return (
    <div>
    <AppBarComponent onMenuClick={handleMenuClick} />
    {selectedMenuItem === 'Cities' ? (
      <CitiesTableComponent apiEndpoint={apiEndpoint} />
    ) : selectedMenuItem === 'Projects' ? (
      <ProjectsTableComponent apiEndpoint={apiEndpoint} />
    ) : (
      <TableComponent apiEndpoint={apiEndpoint} />
    )}
  </div>
  );
};

export default App;
