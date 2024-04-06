/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['sequelize'],
    serverActions: {
      bodySizeLimit: '5mb'
    },
  },
};

export default nextConfig;
