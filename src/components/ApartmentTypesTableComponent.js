import React from 'react';
import axios from '../config/axiosConfig';

const ApartmentTypesTableComponent = ({ types, setSelectedType }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>Type ID</th>
                    <th>Type Name</th>
                    <th>Number of Rooms</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {types.map((type) => (
                    <tr key={type.TypeID}>
                        <td>{type.TypeID}</td>
                        <td>{type.TypeName}</td>
                        <td>{type.NumberOfRooms}</td>
                        <td>
                            <button onClick={() => setSelectedType(type)}>Edit</button>
                            {/* Add Delete functionality here */}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default ApartmentTypesTableComponent;
