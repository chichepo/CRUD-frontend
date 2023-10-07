import { useEffect, useState } from 'react';
import axiosInstance from '../config/axiosConfig';

const useFetchData = (apiEndpoint) => { // Accept the API endpoint as a parameter
    const [data, setData] = useState([]);

    const fetchData = async () => {
        try {
            const response = await axiosInstance.get(apiEndpoint); // Use the provided API endpoint
            setData(response.data);
        } catch (error) {
            console.error("An error occurred while fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [apiEndpoint]); // Include apiEndpoint as a dependency

    return { data, fetchData };
};

export default useFetchData;
