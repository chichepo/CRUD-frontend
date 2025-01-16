import React, { useState } from 'react';
import AppBarComponent from './components/AppBarComponent';
import CitiesTableComponent from './components/CitiesTableComponent';
import ProjectsTableComponent from './components/ProjectsTableComponent';
import BuildingsTableComponent from './components/BuildingsTableComponent';
import ApartmentTypesTableComponent from './components/ApartmentTypesTableComponent';
import ApartmentsTableComponent from './components/ApartmentsTableComponent';
import RentalPricesTableComponent from './components/RentalPricesTableComponent';
import ExternalParametersTableComponent from './components/ExternalParametersTableComponent';

const menuItems = [
  'Cities',
  'Projects',
  'Buildings',
  'ApartmentTypes',
  'Apartments',
  'RentalPrices',
  'ExternalParameters',
];

const componentMap = {
  Cities: CitiesTableComponent,
  Projects: ProjectsTableComponent,
  Buildings: BuildingsTableComponent,
  ApartmentTypes: ApartmentTypesTableComponent,
  Apartments: ApartmentsTableComponent,
  RentalPrices: RentalPricesTableComponent,
  ExternalParameters: ExternalParametersTableComponent,
};

const App = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState('Cities');
  const [apiEndpoint, setApiEndpoint] = useState('/api/cities');

  const handleMenuClick = (menuItem) => {
    setSelectedMenuItem(menuItem);
    setApiEndpoint(`/api/${menuItem.toLowerCase()}`);
  };

  const SelectedComponent = componentMap[selectedMenuItem];

  return (
    <div>
      <AppBarComponent onMenuClick={handleMenuClick} />
      {SelectedComponent && <SelectedComponent apiEndpoint={apiEndpoint} />}
    </div>
  );
};

export default App;
