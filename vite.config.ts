import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // 개발 환경 CORS 우회: /api/tats/* → 공공데이터포털
      '/api/tats': {
        target: 'https://apis.data.go.kr',
        changeOrigin: true,
        secure: true,
        rewrite: (path) =>
          path.replace(/^\/api\/tats/, '/B551011/TatsCnctrRateService'),
      },
    },
  },
})
