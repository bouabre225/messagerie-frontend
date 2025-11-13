import { createContext, useState, useEffect } from "react";
import {api} from "../api"

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [ User, setUser] = useState(null);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            api.get("/me", {
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
    const response = await api.post("/login", { email, password });
    localStorage.setItem("token", response.data.access_token);
    setUser(response.data.user);
  } catch (error) {
    if (error.response && error.response.status === 422) {
      console.log(error.response.data.errors);
      setErrors(error.response.data.errors);
    } else {
      console.error(error);
    }
    setUser(null);
  }
};

    const register = async (name, email, password) => {
        try {
            const response = await api.post("/register", { name, email, password });
            localStorage.setItem("token", response.data.access_token);
            setUser(response.data.user);
        } catch (error) {
            if (error.response && error.response.status === 422) {
                console.log(error.response.data.errors);
                setErrors(error.response.data.errors);
              } else {
                console.error(error);
              }
            setUser(null);
        }
    };

     const logout = async () => {
        const token = localStorage.getItem("token");
        await api.post("/logout", {}, { headers: { Authorization: `Bearer ${token}` } });
        localStorage.removeItem("token");
        setUser(null);
    };
    
    return (
        <AuthContext.Provider value={{ User, setUser, login, register, logout, errors, setErrors }}>
            {children}
        </AuthContext.Provider>
    );
}