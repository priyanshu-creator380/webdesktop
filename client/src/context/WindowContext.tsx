import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

type WindowState = {
  activeWindow: string | null;
  minimizedWindows: Set<string>;
};

type WindowContextType = {
  windowState: WindowState;
  openWindow: (id: string) => void;
  closeWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  maximizeWindow: (id: string) => void;
};

const WindowContext = createContext<WindowContextType | undefined>(undefined);

export function WindowProvider({ children }: { children: ReactNode }) {
  const [windowState, setWindowState] = useState<WindowState>({
    activeWindow: 'intro', // Set intro as default
    minimizedWindows: new Set(),
  });

  const openWindow = (id: string) => {
    setWindowState(prev => ({
      ...prev,
      activeWindow: id,
      minimizedWindows: new Set(Array.from(prev.minimizedWindows).filter(x => x !== id))
    }));
  };

  const closeWindow = (id: string) => {
    setWindowState(prev => ({
      ...prev,
      activeWindow: prev.activeWindow === id ? null : prev.activeWindow,
      minimizedWindows: new Set(Array.from(prev.minimizedWindows).filter(x => x !== id))
    }));
  };

  const minimizeWindow = (id: string) => {
    setWindowState(prev => ({
      ...prev,
      activeWindow: prev.activeWindow === id ? null : prev.activeWindow,
      minimizedWindows: new Set([...Array.from(prev.minimizedWindows), id])
    }));
  };

  const maximizeWindow = (id: string) => {
    setWindowState(prev => ({
      ...prev,
      minimizedWindows: new Set(Array.from(prev.minimizedWindows).filter(x => x !== id))
    }));
  };

  return (
    <WindowContext.Provider value={{ 
      windowState, 
      openWindow, 
      closeWindow, 
      minimizeWindow, 
      maximizeWindow 
    }}>
      <div>
        {children}
      </div>
    </WindowContext.Provider>
  );
}

export function useWindow() {
  const context = useContext(WindowContext);
  if (!context) {
    throw new Error('useWindow must be used within a WindowProvider');
  }
  return context;
}