/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['firebasestorage.googleapis.com'], // Firebaseのドメインを追加
  },
};

export default nextConfig;
