/** @type {import('next').NextConfig} */
import withPlaiceholder from '@plaiceholder/next';
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'icvuxqufvnpifmhnduir.supabase.co',
        port: '',

      },
    ],
  },
};
export default withPlaiceholder(nextConfig);
