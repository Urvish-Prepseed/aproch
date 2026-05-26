/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "aproch.org" },
      { protocol: "https", hostname: "jolt-edit-44752845.figma.site" },
    ],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384, 512, 640, 750],
    qualities: [75, 90],
    minimumCacheTTL: 60,
  },
};

export default nextConfig;
