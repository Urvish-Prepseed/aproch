/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "aproch.org" },
      { protocol: "https", hostname: "jolt-edit-44752845.figma.site" },
    ],
  },
};

export default nextConfig;
