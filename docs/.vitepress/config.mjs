import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'AI Agent Articles',
  description: 'Exploring ReAct Agent, Function Calling, MCP, and Skills - Best practices from Lynxe development',
  
  // SEO settings
  head: [
    ['meta', { name: 'keywords', content: 'AI Agent, ReAct Agent, Function Calling, MCP, Skills, LLM, Agent Framework' }],
    ['meta', { name: 'author', content: 'Lynxe Team' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: 'AI Agent Articles' }],
    ['meta', { property: 'og:description', content: 'Exploring ReAct Agent, Function Calling, MCP, and Skills' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['link', { rel: 'canonical', href: 'https://lynxe.cc/' }]
  ],

  // Base URL for custom domain
  base: '/',

  // Language
  lang: 'en-US',

  // Theme configuration
  themeConfig: {
    // Site title in nav bar
    siteTitle: 'AI Agent Articles',
    
    // Logo (optional)
    // logo: '/logo.png',
    
    // Navigation
    nav: [
      { text: 'Home', link: '/' },
      { text: '中文', link: '/zh/' },
      { text: 'English', link: '/en/' },
      { text: 'Lynxe', link: 'https://github.com/spring-ai-alibaba/Lynxe' }
    ],

    // Sidebar
    sidebar: {
      '/zh/': [
        {
          text: 'AI Agent 系列',
          items: [
            { text: '什么是 ReAct Agent？', link: '/zh/react-agent-intro' },
            { text: 'Agent vs 传统编程 vs Workflow', link: '/zh/react-agent-vs-traditional' },
            { text: 'Function Calling、MCP和Skills', link: '/zh/function-calling-mcp-skills-outline' }
          ]
        }
      ],
      '/en/': [
        {
          text: 'AI Agent Series',
          items: [
            { text: 'What is a ReAct Agent?', link: '/en/react-agent-intro' },
            { text: 'Agent vs Traditional Programming vs Workflow', link: '/en/react-agent-vs-traditional' },
            { text: 'Function Calling, MCP and Skills', link: '/en/function-calling-mcp-skills-outline' }
          ]
        }
      ]
    },

    // Social links
    socialLinks: [
      { icon: 'github', link: 'https://github.com/spring-ai-alibaba/Lynxe' }
    ],

    // Footer
    footer: {
      message: 'Built with VitePress',
      copyright: 'Copyright © 2024'
    },

    // Search
    search: {
      provider: 'local'
    },

    // Edit link (optional)
    // editLink: {
    //   pattern: 'https://github.com/YOUR_USERNAME/ai-article/edit/main/docs/:path'
    // }
  },

  // Markdown configuration
  markdown: {
    lineNumbers: true,
    // Enable anchor links for headings
    anchor: {
      permalink: true
    }
  },

  // Sitemap configuration (VitePress generates sitemap automatically)
  // The sitemap will be available at /sitemap.xml
})

