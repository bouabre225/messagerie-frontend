import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [ User, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            axios.get("/api/me", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then((response) => {
                setUser(response.data);
            })
            .catch(() => {
                setUser(null);
            })
        }
    }, []);

    const login = async (email, password) => {
        try {
            const response = await axios.post("/api/login", { email, password });
             localStorage.setItem("token", response.data.access_token);
                setUser(response.data.user);
        } catch (error) {
            console.error(error);
            setUser(null);
        }
    }

    const register = async (name, email, password) => {
        try {
            const response = await axios.post("/api/register", { name, email, password });
            localStorage.setItem("token", response.data.access_token);
            setUser(response.data.user);
        } catch (error) {
            console.error(error);
            setUser(null);
        }
    };

     const logout = async () => {
        const token = localStorage.getItem("token");
        await axios.post("/api/logout", {}, { headers: { Authorization: `Bearer ${token}` } });
        localStorage.removeItem("token");
        setUser(null);
    };
    
    return (
        <AuthContext.Provider value={{ User, setUser, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
}