import React, { createContext, useContext, useState, useEffect } from 'react';
import { DataService } from '../services/DataService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedAuth = localStorage.getItem('portfolio_auth');
        if (storedAuth === 'true') {
            setIsAuthenticated(true);
        }
        setLoading(false);
    }, []);

    const login = async (password) => {
        const isValid = await DataService.checkPassword(password);
        if (isValid) {
            localStorage.setItem('portfolio_auth', 'true');
            setIsAuthenticated(true);
            return true;
        }
        return false;
    };

    const logout = () => {
        localStorage.removeItem('portfolio_auth');
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
