/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    instrumentationHook: true,
  },
  images: {
    domains: ["pixabay.com"],
  },
};

export default nextConfig;
