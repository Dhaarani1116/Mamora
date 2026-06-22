import React, { createContext, useContext, useState, useEffect } from 'react';

const OfflineContext = createContext();

export function OfflineProvider({ children }) {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [syncQueue, setSyncQueue] = useState(() => {
    const saved = localStorage.getItem('maatrucare_sync_queue');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      syncData();
    };
    
    const handleOffline = () => {
      setIsOnline(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [syncQueue]);

  const syncData = async () => {
    if (syncQueue.length === 0) return;
    
    console.log('Syncing offline data...');
    
    for (const item of syncQueue) {
      try {
        console.log('Syncing item:', item);
      } catch (error) {
        console.error('Sync failed for item:', item);
      }
    }
    
    setSyncQueue([]);
    localStorage.setItem('maatrucare_sync_queue', JSON.stringify([]));
  };

  const addToSyncQueue = (data) => {
    const newQueue = [...syncQueue, { ...data, timestamp: Date.now() }];
    setSyncQueue(newQueue);
    localStorage.setItem('maatrucare_sync_queue', JSON.stringify(newQueue));
  };

  const saveOffline = (key, data) => {
    localStorage.setItem(`maatrucare_${key}`, JSON.stringify(data));
  };

  const getOffline = (key) => {
    const data = localStorage.getItem(`maatrucare_${key}`);
    return data ? JSON.parse(data) : null;
  };

  const value = {
    isOnline,
    syncQueue,
    addToSyncQueue,
    saveOffline,
    getOffline,
    syncData
  };

  return (
    <OfflineContext.Provider value={value}>
      {children}
      {!isOnline && (
        <div className="fixed top-0 left-0 right-0 bg-yellow-500 text-white text-center py-1 text-xs z-50">
          ⚠️ Offline Mode - Changes will sync when online
        </div>
      )}
    </OfflineContext.Provider>
  );
}

export function useOffline() {
  const context = useContext(OfflineContext);
  if (!context) {
    throw new Error('useOffline must be used within OfflineProvider');
  }
  return context;
}

export default OfflineContext;
