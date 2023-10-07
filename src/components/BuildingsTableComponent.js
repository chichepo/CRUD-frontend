import React from 'react';

const BuildingsTableComponent = ({ buildings, setSelectedBuilding }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>Building ID</th>
                    <th>Building Name</th>
                    <th>Project ID</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {buildings.map((building) => (
                    <tr key={building.BuildingID}>
                        <td>{building.BuildingID}</td>
                        <td>{building.BuildingName}</td>
                        <td>{building.ProjectID}</td>
                        <td>
                            <button onClick={() => setSelectedBuilding(building)}>Edit</button>
                            {/* Add Delete functionality here */}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default BuildingsTableComponent;
