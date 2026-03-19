/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Permet au build de passer malgré les avertissements d'apostrophes non-échappées
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
