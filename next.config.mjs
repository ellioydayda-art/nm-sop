/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'adespresso.com' },
      { protocol: 'https', hostname: 'assets.cdn.filesafe.space' },
    ],
  },
};

export default nextConfig;
