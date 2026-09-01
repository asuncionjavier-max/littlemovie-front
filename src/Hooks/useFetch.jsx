import { useEffect, useState } from "react";
import apiCLient from "../config/axios";

const useFetch = (endpoint) =>{
const [data, setData] = useState(null);
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null) 

useEffect (() =>{
    const getData = async () =>{
        try {
            setLoading(true)
            const response = await apiCLient.get(endpoint);

            setData(response.data.data !== undefined ? response.data.data : response.data)

            console.log(response.data)
        } catch (error) {
            setError(error.response?.data?.message || "Error al conectar con la API")
            
        } finally{
            setLoading(false);
        }
    };
    if(endpoint)getData(); }, [endpoint]);
    
    return { data, loading, error };
};

export default useFetch