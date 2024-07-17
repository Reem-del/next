/** @type {import('next').NextConfig} */

const nextConfig = {
     sassOptions: {
    includePaths: ['./styles'],
  },
 
    // <=== enables static exports
  reactStrictMode: true,

};

export default nextConfig;
