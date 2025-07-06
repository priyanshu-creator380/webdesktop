import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Terminal, Maximize } from 'lucide-react';

export function Preloader() {
  const [showPreloader, setShowPreloader] = useState(true);
  const [showLogin, setShowLogin] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginComplete, setLoginComplete] = useState(false);
  const [showButton, setShowButton] = useState(true);

  const handleButtonClick = () => {
    setShowButton(false);
    // Request fullscreen
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen().catch(err => {
        console.error('Error attempting to enable fullscreen:', err);
      });
    }
    
    // Start login animation sequence
    startLoginSequence();
  };

  const startLoginSequence = () => {
    // Show login screen after initial animation
    setTimeout(() => setShowLogin(true), 1500);
    
    // Simulate typing username
    setTimeout(() => {
      const type = async () => {
        const text = 'AI CLUB';
        for (let i = 0; i < text.length; i++) {
          setUsername(text.slice(0, i + 1));
          await new Promise(resolve => setTimeout(resolve, 100));
        }
        
        // Start typing password after username
        const pass = 'codeWithUs';
        for (let i = 0; i < pass.length; i++) {
          setPassword(pass.slice(0, i + 1));
          await new Promise(resolve => setTimeout(resolve, 100));
        }
        
        // Complete login animation
        await new Promise(resolve => setTimeout(resolve, 500));
        setLoginComplete(true);
        
        // Hide preloader
        await new Promise(resolve => setTimeout(resolve, 1000));
        setShowPreloader(false);
      };
      
      type();
    }, 2000);
  };

  return (
    <AnimatePresence>
      {showPreloader && (
        <motion.div
          className="fixed inset-0 bg-black z-50 flex items-center justify-center flex-col"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {showButton ? (
            <motion.button
              className="bg-green-500 text-black px-6 py-3 rounded-md flex items-center gap-2 font-mono text-lg hover:bg-green-400 transition-colors mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleButtonClick}
            >
              <Maximize className="w-5 h-5" />
              Login
            </motion.button>
          ) : (
            <motion.div
              className="text-white space-y-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {!showLogin ? (
                <motion.div
                  className="flex items-center gap-4"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  <Terminal className="w-12 h-12" />
                  <span className="text-2xl font-mono">Loading System...</span>
                </motion.div>
              ) : (
                <div className="font-mono space-y-4">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <p className="text-green-500">Welcome to LPCPS AI Club OS</p>
                    <p className="mt-2">
                      Username  : {username}
                      <motion.span
                        animate={{ opacity: [0, 1] }}
                        transition={{ repeat: Infinity, duration: 0.8 }}
                      >
                        _
                      </motion.span>
                    </p>
                    {username === 'AI CLUB' && (
                      <p>
                        password: {'*'.repeat(password.length)}
                        <motion.span
                          animate={{ opacity: [0, 1] }}
                          transition={{ repeat: Infinity, duration: 0.8 }}
                        >
                          _
                        </motion.span>
                      </p>
                    )}
                    {loginComplete && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-green-500 mt-4"
                      >
                        Login successful. Starting desktop environment...
                      </motion.p>
                    )}
                  </motion.div>
                </div>
              )}
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}