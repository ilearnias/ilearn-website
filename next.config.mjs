/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'bairuha-bucket.s3.ap-south-1.amazonaws.com',
      'adfw.s3.me-central-1.amazonaws.com',
      'example.com',
      'ilearn.bairuhatech.com', // Added for next/image external images
      'media.istockphoto.com',
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: '/api/:path*',
      },
    ];
  },
};

export default nextConfig;
