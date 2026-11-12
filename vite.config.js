import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import socials from './src/data/socials.js'

// Injects canonical / og:url / og:image / twitter:image only when the real
// site URL is known, because social crawlers need absolute URLs.
//   SITE_URL=https://your-site.example npm run build
function siteMeta(siteUrl) {
  const base = (siteUrl || '').replace(/\/+$/, '')
  return {
    name: 'site-meta',
    // robots.txt + sitemap.xml are generated so they always carry the real URL.
    generateBundle() {
      const robots = ['User-agent: *', 'Allow: /']
      if (base) robots.push('', `Sitemap: ${base}/sitemap.xml`)
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: robots.join('\n') + '\n' })
      if (base) {
        const day = new Date().toISOString().slice(0, 10)
        this.emitFile({
          type: 'asset',
          fileName: 'sitemap.xml',
          source:
            '<?xml version="1.0" encoding="UTF-8"?>\n' +
            '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
            `  <url>\n    <loc>${base}/</loc>\n    <lastmod>${day}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>1.0</priority>\n  </url>\n` +
            '</urlset>\n',
        })
      }
    },
    transformIndexHtml(html) {
      if (!base) {
        return html.replace('__TWITTER_CARD__', 'summary')
      }
      const person = {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: 'Rajan Kumar',
        url: `${base}/`,
        image: `${base}/og-image.png`,
        jobTitle: 'Computer Science undergraduate',
        description:
          'Computer Science undergraduate specializing in cybersecurity fundamentals and applied AI/ML.',
        alumniOf: {
          '@type': 'CollegeOrUniversity',
          name: 'Sitamarhi Institute of Technology',
        },
        knowsAbout: [
          'Cybersecurity',
          'Network security',
          'Machine learning',
          'Full-stack web development',
          'Python',
        ],
        sameAs: [socials.github, socials.linkedin, socials.devPortfolio],
      }
      const tags = [
        `<script type="application/ld+json">${JSON.stringify(person)}</script>`,
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
// SITE_URL wins; otherwise fall back to the production domain Vercel exposes
  // automatically (VERCEL_PROJECT_PRODUCTION_URL has no protocol).
  const siteUrl =
    env.SITE_URL ||
    (env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${env.VERCEL_PROJECT_PRODUCTION_URL}`
      : '')
  return {
    plugins: [react(), tailwindcss(), siteMeta(siteUrl)],
  }
})
