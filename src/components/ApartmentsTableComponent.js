import React from 'react';
import axios from '../config/axiosConfig';

const ApartmentsTableComponent = ({ apartments, setSelectedApartment, fetchApartments }) => {
    const handleEdit = (apartment) => {
        setSelectedApartment(apartment);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/api/apartments/${id}`);
            fetchApartments();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <table>
            <thead>
                <tr>
                    <th>ApartmentID</th>
                    <th>BuildingID</th>
                    <th>ApartmentNumber</th>
                    <th>Floor</th>
                    {/* ... other headers ... */}
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {apartments.map((apartment) => (
                    <tr key={apartment.ApartmentID}>
                        <td>{apartment.ApartmentID}</td>
                        <td>{apartment.BuildingID}</td>
                        <td>{apartment.ApartmentNumber}</td>
                        <td>{apartment.Floor}</td>
                        {/* ... other fields ... */}
                        <td>
                            <button onClick={() => handleEdit(apartment)}>Edit</button>
                            <button onClick={() => handleDelete(apartment.ApartmentID)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default ApartmentsTableComponent;
