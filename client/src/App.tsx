import { useState, useEffect } from 'react';
import { Preloader } from './components/layout/Preloader';
import { Taskbar } from './components/layout/Taskbar';
import { WindowProvider } from './context/WindowContext';
import { Introduction } from './components/sections/Introduction';
import { About } from './components/sections/About';
import { Events } from './components/sections/Events';
import { Projects } from './components/sections/Projects';
import { Members } from './components/sections/Members';
import { Gallery } from './components/sections/Gallery';
import img from "./public/logo.png";
import { DesktopIcons } from './components/sections/DesktopIcons'; 

function App() {
  const [isFullscreen, setIsFullscreen] = useState(false);
  useEffect(() => {
    const handleUserInteraction = () => {
      if (!isFullscreen) {
        enterFullScreen();
        setIsFullscreen(true);
        document.removeEventListener("click", handleUserInteraction);
      }
    };
    document.addEventListener("click", handleUserInteraction);
    return () => {
      document.removeEventListener("click", handleUserInteraction);
    };
  }, [isFullscreen]);
  const enterFullScreen = () => {
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen().catch((err) => console.log("Fullscreen error:", err));
    } else if ((elem as any).mozRequestFullScreen) {
      (elem as any).mozRequestFullScreen(); // Firefox
    } else if ((elem as any).webkitRequestFullscreen) {
      (elem as any).webkitRequestFullscreen(); // Chrome, Safari, Opera
    } else if ((elem as any).msRequestFullscreen) {
      (elem as any).msRequestFullscreen(); // IE/Edge
    }
  };
  return (
    <>
      <Preloader />
      <WindowProvider>
        <div className="flex h-screen bg-gradient-to-br from-[#1a1b26] to-[#24273a] overflow-hidden">
          <Taskbar />
          <div className="flex-1 relative">
            <img src={img} alt="logo" className='absolute z-0 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'/>
            <DesktopIcons />
            <Introduction />
            <About />
            <Events />
            <Projects />
            <Members />
            <Gallery />
          </div>
        </div>
      </WindowProvider>
    </>
  );
}

export default App;