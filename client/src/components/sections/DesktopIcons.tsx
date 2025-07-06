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
interface DesktopItem {
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

const desktopItem: DesktopItem[] = [
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

export const DesktopIcons: React.FC = () => {
  const { windowState, openWindow } = useWindow() as WindowContextType;
  
  return (
    <TooltipProvider>
      <motion.div
        className="w-64 h-[65%] grid grid-cols-2 items-start py-4"
        initial={{ x: -64 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.1 }}
      >
        {desktopItem.map(({ id, icon, label }) => (
          <Tooltip key={id}>
            <TooltipTrigger asChild>
              <motion.div
                className="relative mx-auto"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.button
                  className={`p-3 h-24 justify-center w-24 text-white rounded-xl transition-all duration-300 flex items-center flex-col relative z-0 backdrop-blur-sm gap-4 hover:bg-purple-900/20 `}
                  onClick={() => openWindow(id)}
                >
                  <StyledIcon 
                  className="scale-[2]"
                    icon={icon} 
                    isActive={windowState.activeWindow === id} 

                  style={{
                    color: "purple",
                    filter: "drop"
                  }}
                  />
                  <p>{label}</p>
                </motion.button>
              </motion.div>
            </TooltipTrigger>
          </Tooltip>
        ))}
      </motion.div>
    </TooltipProvider>
  );
};