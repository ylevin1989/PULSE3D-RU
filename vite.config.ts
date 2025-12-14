import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Load env variables from Vercel (process.cwd is root)
  // The third argument '' ensures we load all variables, not just VITE_*
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    plugins: [react()],
    build: {
      outDir: 'dist',
    },
    define: {
      // Replaces process.env.API_KEY in the code with the actual string value
      'process.env.API_KEY': JSON.stringify(env.VITE_API_KEY || env.API_KEY),
    }
  };
});