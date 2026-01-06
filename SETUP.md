# Setup Guide for GitHub Pages Blog

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Configuration

Configuration is already set for `Lynxe-public/Lynxe-article`. 

Optional: Add your Google Search Console verification code in `docs/.vitepress/config.js`

### 3. Test Locally

```bash
npm run dev
```

Visit http://localhost:5173 to preview your site.

### 4. Build and Deploy

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

### 5. Push to GitHub

```bash
git add .
git commit -m "Setup VitePress blog"
git push origin main
```

### 6. Enable GitHub Pages

1. Go to your repository on GitHub
2. Settings → Pages
3. Source: **GitHub Actions** (not "Deploy from a branch")
4. The GitHub Action will automatically build and deploy your site

Your site will be available at: `https://Lynxe-public.github.io/Lynxe-article/`

## Google Search Console Setup

1. **Submit your site:**
   - Go to https://search.google.com/search-console
   - Add property: `https://Lynxe-public.github.io/Lynxe-article/`

2. **Verify ownership:**
   - Choose "HTML tag" method
   - Copy the verification code
   - Add it to `docs/.vitepress/config.js` in the `head` array:
     ```js
     ['meta', { name: 'google-site-verification', content: 'YOUR_CODE_HERE' }]
     ```

3. **Submit sitemap:**
   - After deployment, submit: `https://Lynxe-public.github.io/Lynxe-article/sitemap.xml`
   - VitePress automatically generates this file

4. **robots.txt is already configured** for `Lynxe-public/Lynxe-article`

## SEO Features

✅ Automatic sitemap generation (`/sitemap.xml`)  
✅ Clean, SEO-friendly URLs  
✅ Meta tags for social sharing  
✅ Mobile responsive design  
✅ Fast loading (Vite-powered)  
✅ Search functionality  
✅ Anchor links for headings  

## File Structure

```
ai-article/
├── docs/
│   ├── .vitepress/
│   │   ├── config.js          # Site configuration
│   │   └── theme/              # Custom theme (optional)
│   ├── zh/                     # Chinese articles
│   │   ├── react-agent-intro.md
│   │   ├── react-agent-vs-traditional.md
│   │   └── function-calling-mcp-skills-outline.md
│   ├── en/                     # English articles
│   │   ├── react-agent-intro.md
│   │   ├── react-agent-vs-traditional.md
│   │   └── function-calling-mcp-skills-outline.md
│   ├── public/                 # Static assets
│   │   └── robots.txt
│   └── index.md                # Homepage
├── .github/
│   └── workflows/
│       └── deploy.yml          # Auto-deployment
├── package.json
└── README.md
```

## Adding New Articles

1. Add markdown file to `docs/zh/` or `docs/en/`
2. Update sidebar in `docs/.vitepress/config.js`
3. Push to GitHub - site will auto-deploy

## Troubleshooting

**Build fails:**
- Check Node.js version (should be 18+)
- Run `npm install` again
- Check for syntax errors in config.js

**404 errors:**
- Verify `base` path in config.js matches your repository name
- Check that GitHub Pages is set to "GitHub Actions" source

**Images not loading:**
- Ensure images are in `docs/public/` or same directory as markdown
- Use relative paths: `./image.png` or `/image.png`

## Customization

- **Theme colors:** Edit `docs/.vitepress/theme/custom.css`
- **Navigation:** Edit `nav` array in `config.js`
- **Sidebar:** Edit `sidebar` object in `config.js`
- **Footer:** Edit `footer` in `themeConfig`

