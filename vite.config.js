import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Injects canonical / og:url / og:image / twitter:image only when the real
// site URL is known, because social crawlers need absolute URLs.
//   SITE_URL=https://your-site.example npm run build
function siteMeta(siteUrl) {
  const base = (siteUrl || '').replace(/\/+$/, '')
  return {
    name: 'site-meta',
    transformIndexHtml(html) {
      if (!base) {
        return html.replace('__TWITTER_CARD__', 'summary')
      }
      const tags = [
        `<link rel="canonical" href="${base}/" />`,
        `<meta property="og:url" content="${base}/" />`,
        `<meta property="og:image" content="${base}/og-image.png" />`,
        `<meta property="og:image:width" content="1200" />`,
        `<meta property="og:image:height" content="630" />`,
        `<meta name="twitter:image" content="${base}/og-image.png" />`,
      ].join('\n    ')
      return html
        .replace('__TWITTER_CARD__', 'summary_large_image')
        .replace('</head>', `    ${tags}\n  </head>`)
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '')
  return {
    plugins: [react(), tailwindcss(), siteMeta(env.SITE_URL)],
  }
})
