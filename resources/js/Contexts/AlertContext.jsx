import { createContext, useContext, useState, useCallback, useRef } from 'react';

const AlertContext = createContext(null);

export function AlertProvider({ children }) {
    const [alerts, setAlerts] = useState([]);
    const [position, setPosition] = useState('top-right');
    const idCounterRef = useRef(0);
    const recentMessagesRef = useRef(new Map()); // Track recent messages to prevent duplicates
    
    // Clean up old message tracking (older than 2 seconds)
    const cleanupRecentMessages = useCallback(() => {
        const now = Date.now();
        const cutoff = now - 2000; // 2 seconds
        for (const [key, timestamp] of recentMessagesRef.current.entries()) {
            if (timestamp < cutoff) {
                recentMessagesRef.current.delete(key);
            }
        }
    }, []);

    const add = useCallback((type, message, duration = 5000) => {
        if (!message) return null;
        
        // Clean up old tracking
        cleanupRecentMessages();
        
        // Create a key for deduplication (type + message)
        const dedupeKey = `${type}:${message}`;
        
        // Check if this exact message was shown recently (within 2 seconds)
        if (recentMessagesRef.current.has(dedupeKey)) {
            return null; // Don't show duplicate
        }
        
        // Track this message
        recentMessagesRef.current.set(dedupeKey, Date.now());
        
        // Generate unique ID
        idCounterRef.current += 1;
        const id = idCounterRef.current;
        
        setAlerts(prev => {
            // Also check if same message already exists in current alerts
            const exists = prev.some(a => a.type === type && a.message === message);
            if (exists) return prev;
            
            return [...prev, { id, type, message }];
        });
        
        if (duration > 0) {
            setTimeout(() => remove(id), duration);
        }
        
        return id;
    }, [cleanupRecentMessages]);

    const addAlert = useCallback((message, type = 'info', duration = 5000) => {
        return add(type, message, duration);
    }, [add]);
    
    const remove = useCallback((id) => {
        setAlerts(prev => prev.filter(a => a.id !== id));
    }, []);
    
    const clear = useCallback(() => {
        setAlerts([]);
        recentMessagesRef.current.clear();
    }, []);
    
    const success = useCallback((msg, duration) => add('success', msg, duration), [add]);
    const error = useCallback((msg, duration) => add('error', msg, duration), [add]);
    const warning = useCallback((msg, duration) => add('warning', msg, duration), [add]);
    const info = useCallback((msg, duration) => add('info', msg, duration), [add]);
    
    return (
        <AlertContext.Provider value={{ 
            alerts, 
            add, 
            addAlert, 
            remove, 
            removeAlert: remove, 
            clear, 
            success, 
            error, 
            warning, 
            info,
            position,
            setPosition
        }}>
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
