import type { SiteConfig } from '~/types'

const config: SiteConfig = {
  // Absolute URL to the root of your published site, used for generating links and sitemaps.
  site: 'https://samsblog.minersonline.uk',
  // The name of your site, used in the title and for SEO.
  title: 'Sam\'s Blog',
  // The description of your site, used for SEO and RSS feed.
  description:`Welcome to my blog! I'm a computer networking and business applications enthusiast.
  Here I share insights, tutorials, and thoughts on networking technologies, IT infrastructure,
  and how businesses can leverage software to succeed.`,
  // The author of the site, used in the footer, SEO, and RSS feed.
  author: 'Samuel Hulme',
  // Keywords for SEO, used in the meta tags.
  tags: ['blog', 'networking', 'IT', 'business applications', 'technology', 'tutorials', 'insights'],
  // Path to the image used for generating social media previews.
  // Needs to be a square JPEG file due to limitations of the social card generator.
  // Try https://squoosh.app/ to easily convert images to JPEG.
  socialCardAvatarImage: './src/content/avatar.jpg',
  // Font imported from @fontsource or elsewhere, used for the entire site.
  // To change this see src/styles/global.css and import a different font.
  font: 'JetBrains Mono Variable',
  // For pagination, the number of posts to display per page.
  // The homepage will display half this number in the "Latest Posts" section.
  pageSize: 6,
  // Whether Astro should resolve trailing slashes in URLs or not.
  // This value is used in the astro.config.mjs file and in the "Search" component to make sure pagefind links match this setting.
  // It is not recommended to change this, since most links existing in the site currently do not have trailing slashes.
  trailingSlashes: false,
  // The navigation links to display in the header.
  navLinks: [
    {
      name: 'Home',
      url: '/',
    },
    {
      name: 'About',
      url: '/about',
    },
    {
      name: 'Projects',
      url: '/projects',
    },
    {
      name: 'Posts',
      url: '/posts',
    },
    {
      name: 'GitHub',
      url: 'https://github.com/ajh123/',
      external: true,
    },
  ],
  // The theming configuration for the site.
  themes: {
    // The theming mode. One of "single" | "select" | "light-dark-auto".
    mode: 'select',
    // The default theme identifier, used when themeMode is "select" or "light-dark-auto".
    // Make sure this is one of the themes listed in `themes` or "auto" for "light-dark-auto" mode.
    default: 'houston',
    // Shiki themes to bundle with the site.
    // https://expressive-code.com/guides/themes/#using-bundled-themes
    // These will be used to theme the entire site along with syntax highlighting.
    // To use light-dark-auto mode, only include a light and a dark theme in that order.
    // include: [
    //   'github-light',
    //   'github-dark',
    // ]
    include: [
      'andromeeda',
      'aurora-x',
      'ayu-dark',
      'catppuccin-frappe',
      'catppuccin-latte',
      'catppuccin-macchiato',
      'catppuccin-mocha',
      'dark-plus',
      'dracula',
      'dracula-soft',
      'everforest-dark',
      'everforest-light',
      'github-dark',
      'github-dark-default',
      'github-dark-dimmed',
      'github-dark-high-contrast',
      'github-light',
      'github-light-default',
      'github-light-high-contrast',
      'gruvbox-dark-hard',
      'gruvbox-dark-medium',
      'gruvbox-dark-soft',
      'gruvbox-light-hard',
      'gruvbox-light-medium',
      'gruvbox-light-soft',
      'houston',
      'kanagawa-dragon',
      'kanagawa-lotus',
      'kanagawa-wave',
      'laserwave',
      'light-plus',
      'material-theme',
      'material-theme-darker',
      'material-theme-lighter',
      'material-theme-ocean',
      'material-theme-palenight',
      'min-dark',
      'min-light',
      'monokai',
      'night-owl',
      'nord',
      'one-dark-pro',
      'one-light',
      'plastic',
      'poimandres',
      'red',
      'rose-pine',
      'rose-pine-dawn',
      'rose-pine-moon',
      'slack-dark',
      'slack-ochin',
      'snazzy-light',
      'solarized-dark',
      'solarized-light',
      'synthwave-84',
      'tokyo-night',
      'vesper',
      'vitesse-black',
      'vitesse-dark',
      'vitesse-light',
    ],
    // Optional overrides for specific themes to customize colors.
    // Their values can be either a literal color (hex, rgb, hsl) or another theme key.
    // See themeKeys list in src/types.ts for available keys to override and reference.
    overrides: {
      // Improve readability for aurora-x theme
      // 'aurora-x': {
      //   background: '#292929FF',
      //   foreground: '#DDDDDDFF',
      //   warning: '#FF7876FF',
      //   important: '#FF98FFFF',
      //   note: '#83AEFFFF',
      // },
      // Make the GitHub dark theme a little cuter
      // 'github-light': {
      //   accent: 'magenta',
      //   heading1: 'magenta',
      //   heading2: 'magenta',
      //   heading3: 'magenta',
      //   heading4: 'magenta',
      //   heading5: 'magenta',
      //   heading6: 'magenta',
      //   separator: 'magenta',
      //   link: 'list',
      // },
    },
  },
  // Social links to display in the footer.
  socialLinks: {
    github: 'https://github.com/ajh123/',
    mastodon: undefined,
    email: undefined,
    linkedin: 'https://linkedin.com/in/samuel-hulme-423210254',
    bluesky: undefined,
    twitter: undefined,
    youtube: 'https://www.youtube.com/@samuelh2005-mc',
    discord: 'https://discord.gg/MMwxg32',
    rss: true, // Set to true to include an RSS feed link in the footer
  },
  // Configuration for Giscus comments.
  // To set up Giscus, follow the instructions at https://giscus.app/
  // You'll need a GitHub repository with discussions enabled and the Giscus app installed.
  // Take the values from the generated script tag at https://giscus.app and fill them in here.
  // IMPORTANT: Update giscus.json in the root of the project with your own website URL
  // If you don't want to use Giscus, set this to undefined.
  giscus: {
    repo: 'ajh123/blog',
    repoId: 'R_kgDOON2lxg',
    category: 'Giscus',
    categoryId: 'DIC_kwDOON2lxs4Cvb3Q',
    reactionsEnabled: true, // Enable reactions on post itself
  },
  // These are characters available for the character chat feature.
  // To add your own character, add an image file to the top-level `/public` directory
  // Make sure to compress the image to a web-friendly size (<100kb)
  // Try using the excellent https://squoosh.app web app for creating small webp files
  characters: {
    owl: '/owl.webp',
    unicorn: '/unicorn.webp',
    duck: '/duck.webp',
  },

  projects: [
    {
      name: "Miners Online",
      description: "An open-source Minecraft minigame network that I founded in 2017 and help manage.",
      projects: [
        {
          name: "monorepo",
          description: "The main monorepo containing all Miners Online server code.",
          url: "https://github.com/miners-online/monorepo"
        },
        {
          name: "website",
          description: "The website for Miners Online.",
          url: "https://github.com/miners-online/website",
          resourceLinks: [
            {
              name: "Live Site",
              url: "https://minersonline.uk"
            }
          ]
        }
      ]
    },
    {
      name: "CloudinatorMC",
      description: "A collection of tools written in Rust for managing Minecraft servers at enterprise scale.",
      projects: [
        {
          name: "mc-router",
          description: "A high-performance Minecraft proxy server written in Rust.",
          url: "https://github.com/CloudinatorMC/mc-router"
        },
        {
          name: "mc-protocol",
          description: "A Minecraft protocol library for Rust.",
          url: "https://github.com/CloudinatorMC/mc-protocol"
        },
        {
          name: "mc-dashboard",
          description: "A web-based dashboard for managing Minecraft proxies and tunnels.",
          url: "https://github.com/CloudinatorMC/dashboard"
        },
        {
          name: "cloudinator-legacy",
          description: "The legacy Cloudinator project containing various Minecraft server management tools.",
          url: "https://github.com/CloudinatorMC/cloudinator-legacy"
        }
      ]
    },
    {
      name: "Samland Gov",
      description: "A Minecraft political simulation server that I founded in 2017 and runs on Miners Online infrastructure.",
      projects: [
        {
          name: "legislation",
          description: "A repository containing the laws and legislation for the Republic of Samland.",
          url: "https://github.com/Samland-Gov/legislation"
        },
        {
          name: "website-v3",
          description: "The website for the Republic of Samland.",
          url: "https://github.com/Samland-Gov/website-v3",
          resourceLinks: [
            {
              name: "Live Site",
              url: "https://samland.minersonline.uk"
            }
          ]
        },
        {
          name: "mobile-docker",
          description: "A Docker Compose project to run an IMS (IP Multimedia Subsystem) core network for mobile communications.",
          url: "https://github.com/Samland-Gov/mobile-docker"
        }
      ]
    },
    {
      name: "Game development experiments",
      description: "My projects experimenting with game development in various programming languages and tools.",
      projects: [
        {
          name: "History Survival",
          url: "https://github.com/HistorySurvival"
        }
      ]
    },
    {
      name: "Other projects",
      description: "A collection of various other projects I've worked on.",
      projects: [
        {
          name: "Be Quiet Negotiator",
          description: "A NeoForge client-side mod to allow the client to join vanilla servers without being kicked for using mods.",
          url: "https://github.com/ajh123/BeQuietNegotiator",
          resourceLinks: [
            {
              name: "Modrinth",
              url: "https://modrinth.com/mod/be-quiet-negotiator"
            },
          ]
        },
        {
          name: "Blog",
          description: "The source code for this blog website.",
          url: "https://github.com/ajh123/blog"
        },
        {
          name: "Net Bits",
          description: "A Python library for serialising and deserialising binary data structures.",
          url: "https://github.com/ajh123/netbits",
          resourceLinks: [
            {
              name: "PyPI",
              url: "https://pypi.org/project/netbits/"
            },
            {
              name: "Documentation",
              url: "https://netbits.minersonline.uk/en/latest/"
            }
          ]
        },
        {
          name: "MetroRail",
          description: "A WIP Minecraft mod for enhancing Minecart railways in Minecraft.",
          url: "https://github.com/ajh123/MetroRail"
        }
      ]
    }
  ]
}

export default config
