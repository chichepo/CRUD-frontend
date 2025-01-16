import { useEffect, useState } from 'react';
import axiosInstance from '../config/axiosConfig';

const useFetchData = (apiEndpoint) => {
    const [data, setData] = useState(null); // Start with null for loading state

    const fetchData = async () => {
        try {
            const response = await axiosInstance.get(apiEndpoint);
            setData(response.data);
        } catch (error) {
            console.error("An error occurred while fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [apiEndpoint]);

    return { data, fetchData };
};

export default useFetchData;
