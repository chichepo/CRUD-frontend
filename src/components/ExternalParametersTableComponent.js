import React from 'react';
import axios from '../config/axiosConfig';

const ExternalParametersTableComponent = ({ externalParameters, setSelectedExternalParameter, fetchExternalParameters }) => {
    const handleEdit = (externalParameter) => {
        setSelectedExternalParameter(externalParameter);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/api/externalParameters/${id}`);
            fetchExternalParameters();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <table>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Source</th>
                    <th>Category</th>
                    {/* ... other headers ... */}
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {externalParameters.map((externalParameter) => (
                    <tr key={externalParameter.Id}>
                        <td>{externalParameter.Id}</td>
                        <td>{externalParameter.Source}</td>
                        <td>{externalParameter.Category}</td>
                        {/* ... other fields ... */}
                        <td>
                            <button onClick={() => handleEdit(externalParameter)}>Edit</button>
                            <button onClick={() => handleDelete(externalParameter.Id)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default ExternalParametersTableComponent;
