import { defineConfig, loadEnv } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default ({ mode }) => {
  process.env = {...process.env, ...loadEnv(mode, process.cwd())};

  return defineConfig({
    plugins: [svelte()],
    base: (process.env.VITE_BASE_URL.length === 0) ? "/" : process.env.VITE_BASE_URL
  })
}
