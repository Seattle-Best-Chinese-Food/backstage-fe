import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',  // Make sure Vite listens on all network interfaces
    port: 5173,        // Specify the port Vite should run on
  },
})
