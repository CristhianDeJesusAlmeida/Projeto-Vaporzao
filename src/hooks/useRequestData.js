import { useEffect, useState } from "react";
import { api } from "../services/api";

export const useRequestData = (endpoint) => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const buscarDados = async () => {
            setIsLoading(true);
            try{
                const response = await api.get(endpoint);
                setData(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false)
            }
        };
        buscarDados()
    }, [endpoint]);
    return [data, isLoading, error]
};