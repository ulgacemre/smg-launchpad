const withImages = require('next-images')
const path = require('path')

module.exports =withImages({


  trailingSlash: true,
    eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  images: {
    disableStaticImages: true
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
},

async redirects() {
  return [
    {
      source: '/stake',
      destination: '/stake',
      permanent: true,
    }
    
  ]
},

async rewrites() {
  return [
    {
      source: '/airdrops',
      destination: '/airdrops',
  
    }
    
  ]
},



async rewrites() {
  return [
    {
      source: '/stake-pools/:slug',
      destination: '/stake-pools/:slug', // Matched parameters can be used in the destination
      
    },
  ]
},






})



