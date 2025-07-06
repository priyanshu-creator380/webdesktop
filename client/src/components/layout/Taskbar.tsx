import React from 'react';
import { motion } from 'framer-motion';
import { useWindow } from '@/context/WindowContext';
import {
  Terminal,
  Info,
  Calendar,
  FolderGit2,
  Users,
  Image,
  LucideIcon
} from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Define types for the StyledIcon component
interface StyledIconProps {
  icon: LucideIcon;
  isActive: boolean;
  [key: string]: any;
}

// Define types for the taskbar items
interface TaskbarItem {
  id: string;
  icon: LucideIcon;
  label: string;
}

// Icon wrapper to add custom styling to Lucide icons
const StyledIcon: React.FC<StyledIconProps> = ({ icon: Icon, isActive, ...props }) => (
  <Icon 
    className={`w-6 h-6 transition-all duration-300
      ${isActive ? 'stroke-purple-400 filter drop-shadow-glow' : 'stroke-gray-400'}`} 
    strokeWidth={isActive ? 2.5 : 1.5}
    {...props} 
  />
);

const taskbarItems: TaskbarItem[] = [
  { id: 'intro', icon: Terminal, label: 'Introduction' },
  { id: 'about', icon: Info, label: 'About' },
  { id: 'events', icon: Calendar, label: 'Events' },
  { id: 'projects', icon: FolderGit2, label: 'Projects' },
  { id: 'members', icon: Users, label: 'Members' },
  { id: 'gallery', icon: Image, label: 'Gallery' },
];

// Define types for window state context
interface WindowState {
  activeWindow: string | null;
}

interface WindowContextType {
  windowState: WindowState;
  openWindow: (id: string) => void;
}

export const Taskbar: React.FC = () => {
  const { windowState, openWindow } = useWindow() as WindowContextType;
  
  return (
    <TooltipProvider>
      <motion.div
        className="w-20 h-screen flex flex-col items-start py-4 gap-3 border-r border-purple-500/20
                  bg-black/40 backdrop-blur-lg shadow-xl"
        initial={{ x: -64 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.1 }}
        style={{
          background: 'linear-gradient(135deg, rgba(23, 25, 35, 0.8) 0%, rgba(26, 27, 38, 0.6) 100%)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 0 0 1px rgba(120, 94, 180, 0.1)'
        }}
      >
        {taskbarItems.map(({ id, icon, label }) => (
          <Tooltip key={id}>
            <TooltipTrigger asChild>
              <motion.div
                className="relative mx-auto"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.button
                  className={`p-3 rounded-xl transition-all duration-300 relative z-10
                    ${windowState.activeWindow === id
                      ? 'bg-purple-900/40 backdrop-blur-md shadow-glow'
                      : 'backdrop-blur-sm hover:bg-purple-900/20'}`}
                  onClick={() => openWindow(id)}
                  style={{
                    boxShadow: windowState.activeWindow === id 
                      ? 'inset 0 0 0 1px rgba(168, 85, 247, 0.3), 0 0 15px rgba(168, 85, 247, 0.3)' 
                      : 'inset 0 0 0 1px rgba(120, 94, 180, 0.1)'
                  }}
                >
                  <StyledIcon 
                    icon={icon} 
                    isActive={windowState.activeWindow === id} 
                  />
                </motion.button>
                {windowState.activeWindow === id && (
                  <motion.div
                    className="absolute -left-3 w-1 h-full top-0 bg-purple-400 rounded-r-full"
                    layoutId="activeIndicator"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.1 }}
                    exit={{ opacity: 0 }}
                    style={{
                      boxShadow: '0 0 8px rgba(168, 85, 247, 0.6)'
                    }}
                  />
                )}
              </motion.div>
            </TooltipTrigger>
            <TooltipContent 
              side="top" 
              className="bg-black/80 text-purple-200 border-purple-500/30 backdrop-blur-md z-50"
              sideOffset={5}
            >
              {label}
            </TooltipContent>
          </Tooltip>
        ))}
      </motion.div>
    </TooltipProvider>
  );
};