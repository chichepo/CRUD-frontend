import React from 'react';

const ExternalParametersValuesTableComponent = ({ paramValues, setSelectedParamValue }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>ApartmentID</th>
                    <th>ExtParamId</th>
                    <th>Value</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {paramValues.map((paramValue) => (
                    <tr key={paramValue.Id}>
                        <td>{paramValue.Id}</td>
                        <td>{paramValue.ApartmentID}</td>
                        <td>{paramValue.ExtParamId}</td>
                        <td>{paramValue.Value}</td>
                        <td>
                            <button onClick={() => setSelectedParamValue(paramValue)}>Edit</button>
                            {/* Add Delete functionality here */}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default ExternalParametersValuesTableComponent;
