import { createContext, useContext, useState, useCallback } from 'react';

const AlertContext = createContext(null);

export function AlertProvider({ children }) {
    const [alerts, setAlerts] = useState([]);
    const [idCounter, setIdCounter] = useState(0);
    
    const add = useCallback((type, message, duration = 5000) => {
        const id = idCounter + 1;
        setIdCounter(id);
        
        setAlerts(prev => [...prev, { id, type, message }]);
        
        if (duration > 0) {
            setTimeout(() => remove(id), duration);
        }
        return id;
    }, [idCounter]);
    
    const remove = useCallback((id) => {
        setAlerts(prev => prev.filter(a => a.id !== id));
    }, []);
    
    const clear = useCallback(() => {
        setAlerts([]);
    }, []);
    
    const success = useCallback((msg, duration) => add('success', msg, duration), [add]);
    const error = useCallback((msg, duration) => add('error', msg, duration), [add]);
    const warning = useCallback((msg, duration) => add('warning', msg, duration), [add]);
    const info = useCallback((msg, duration) => add('info', msg, duration), [add]);
    
    return (
        <AlertContext.Provider value={{ alerts, add, remove, clear, success, error, warning, info }}>
            {children}
        </AlertContext.Provider>
    );
}

export function useAlert() {
    const context = useContext(AlertContext);
    if (!context) {
        throw new Error('useAlert must be used within AlertProvider');
    }
    return context;
}

export default AlertContext;
