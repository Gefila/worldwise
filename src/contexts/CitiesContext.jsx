import { createContext, useContext, useEffect, useState } from "react";
const CitiesContext = createContext();

const BASE_URL = "http://localhost:8000";

function CitiesProvider({ children }) {
    const [cities, setCities] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentCity, setCurrentCity] = useState({});

    useEffect(() => {
        async function fetchCities() {
            try {
                setIsLoading(true);
                const res = await fetch(`${BASE_URL}/cities`);
                const data = await res.json();
                setCities(data);
            } catch {
                console.error("Error fetching data");
            } finally {
                setIsLoading(false);
            }
        }

        fetchCities();
    }, []);

    async function getCity(id) {
        try {
            setIsLoading(true);
            const res = await fetch(`${BASE_URL}/cities/${id}`);
            const data = await res.json();
            setCurrentCity(data);
        } catch {
            console.error("Error fetching data");
        } finally {
            setIsLoading(false);
        }
    }

        async function createCity(newCity) {
        try {
            setIsLoading(true);
            const res = await fetch(`${BASE_URL}/cities`,{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newCity),
            });
            const data = await res.json();
            setCities((prevCities) => [...prevCities, data]);
        } catch {
            console.error("Error fetching data");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <CitiesContext.Provider value={{ cities, setCities, isLoading, getCity, currentCity, createCity}}>
            {children}
        </CitiesContext.Provider>
    );
}

function useCities() {
    const context = useContext(CitiesContext);
    if (context === undefined) {
        throw new Error("useCities must be used within a CitiesProvider");
    }
    return context;
}

export { CitiesProvider, useCities };
