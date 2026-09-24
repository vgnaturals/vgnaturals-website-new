/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Add real remote hosts here if product photos end up on a CDN
    // (e.g. Cloudinary, Google Drive-exported URLs) instead of /public.
    remotePatterns: [],
  },
};

module.exports = nextConfig;
