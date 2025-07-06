import { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Maximize } from 'lucide-react';
import { useWindow } from '@/context/WindowContext';

interface WindowProps {
  id: string;
  title: string;
  children: ReactNode;
}

export function Window({ id, title, children }: WindowProps) {
  const { windowState, closeWindow, minimizeWindow } = useWindow();

  const isActive = windowState.activeWindow === id;
  const isMinimized = windowState.minimizedWindows.has(id);

  if (!isActive && !isMinimized) return null;

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          className="absolute inset-0 m-4 bg-[#1a1b26]/90 backdrop-blur-xl rounded-lg shadow-2xl overflow-hidden border border-purple-500/20"
          initial={{ 
            scale: 0.9, 
            opacity: 0,
            y: 20,
            rotateX: 5 
          }}
          animate={{ 
            scale: 1, 
            opacity: 1,
            y: 0,
            rotateX: 0
          }}
          exit={{ 
            scale: 0.95, 
            opacity: 0,
            y: -20,
            rotateX: -5 
          }}
          transition={{ 
            type: "spring",
            damping: 25,
            stiffness: 280
          }}
        >
          {/* GNOME-style title bar */}
          <div className="flex items-center h-12 px-4 bg-[#1a1b26] border-b border-purple-500/20">
            <div className="flex-1" /> {/* Left spacer */}
            <h2 className="text-sm font-medium text-gray-200 flex-1 text-center">{title}</h2>
            <div className="flex gap-2 flex-1 justify-end">
              <button
                onClick={() => minimizeWindow(id)}
                className="w-6 h-6 rounded-full bg-[#363b54] hover:bg-[#414868] flex items-center justify-center transition-colors group"
              >
                <Minus className="w-3.5 h-3.5 text-gray-400 group-hover:text-white" />
              </button>
              <button
                onClick={() => closeWindow(id)}
                className="w-6 h-6 rounded-full bg-[#363b54] hover:bg-[#414868] flex items-center justify-center transition-colors group"
              >
                <X className="w-3.5 h-3.5 text-gray-400 group-hover:text-white" />
              </button>
            </div>
          </div>

          {/* Content area */}
          <motion.div 
            className="p-6 overflow-auto max-h-[calc(100vh-8rem)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}