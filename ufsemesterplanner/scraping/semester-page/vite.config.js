import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

//https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
})

// exports the build files to flask's static folder
// export default defineConfig({
//   plugins: [react()],
//   build: {
//     outDir: '../static',
//   },
// });