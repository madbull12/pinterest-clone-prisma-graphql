/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images:{
    domains:["i.pinimg.com","www.freepnglogos.com","upload.wikimedia.org"]
  }
}

module.exports = nextConfig
