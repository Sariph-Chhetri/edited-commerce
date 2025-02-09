import axios from 'axios';
import React, { createContext, useState } from 'react'
import { toast } from 'react-hot-toast';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const storedData = localStorage.getItem("userData");
        return storedData ? JSON.parse(storedData) : null; // ✅ Parse JSON properly
    });


    const login = (username, password, navigate, resetform) => {
        axios.post(process.env.REACT_APP_SERVER + "/api/login", { username, password }, { withCredentials: true })
          .then(({ data }) => {
            setUser(data);
            localStorage.setItem("userData", JSON.stringify(data)); // ✅ Convert object to JSON string
            toast.success("Logged in successfully!");
            resetform();
            navigate("/");
          })
          .catch((error) => {
            const errorMessage = error.response?.data?.message || "Something went wrong!";
            toast.error(errorMessage);
          });
    };

    return (
        <UserContext.Provider value={{ user, setUser, login }}>
            {children}
        </UserContext.Provider>
    );
};

