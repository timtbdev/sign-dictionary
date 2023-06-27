/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "images.unsplash.com",
        },
        {
          protocol: "https",
          hostname: "plus.unsplash.com",
        },
        {
          protocol: "https",
          hostname: "supabase.co",
        },
        {
          protocol: "https",
          hostname: "kpvixbyxivhvddgebrgi.supabase.co",
        },
        {
          protocol: "https",
          hostname: "github.com",
        },
        {
          protocol: "https",
          hostname: "lh3.googleusercontent.com",
        }
      ],
    },
  };
  
  module.exports = nextConfig;
  