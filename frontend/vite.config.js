import { defineConfig, loadEnv  } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default ({ mode }) => {
  process.env = Object.assign(process.env, loadEnv(mode, process.cwd(), ''));

  return defineConfig({
  plugins: [vue()],
  server: {
    host: true,
    port: process.env.VITE_PORT,
  },
  resolve: {
    alias: {
      '@':  path.resolve(__dirname, './src'),
    }
  }
});
}

