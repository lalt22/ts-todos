///<reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: "/ts-todos",
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./jest.setup.ts",
},
})
