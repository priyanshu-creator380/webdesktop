/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_PORT: Number;
    // Add any other VITE_ variables here
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
  