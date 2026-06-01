import { useEffect } from "react";
import { useHistory } from "react-router"

export const useProtectedPage = () => {
    
    const history = useHistory();

    useEffect(() => {
        const token = window.localStorage.getItem('token')
    }, [history])

    if (token === null) {
        history.push('/login')
    }
}