/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'cdn2.thecatapi.com',
                port: '',
                pathname: '/images/**'
            },
            {
                protocol: 'https',
                hostname: '28.media.tumblr.com',
                port: '',
                pathname: '/**'
            },
            {
                protocol: 'https',
                hostname: '29.media.tumblr.com',
                port: '',
                pathname: '/**'
            },
            {
                protocol: 'https',
                hostname: '24.media.tumblr.com',
                port: '',
                pathname: '/**'
            },
            {
                protocol: 'https',
                hostname: '25.media.tumblr.com',
                port: '',
                pathname: '/**'
            },
            {
                protocol: 'https',
                hostname: '26.media.tumblr.com',
                port: '',
                pathname: '/**'
            },
            {
                protocol: 'https',
                hostname: '30.media.tumblr.com',
                port: '',
                pathname: '/**'
            },
            {
                protocol: 'https',
                hostname: '27.media.tumblr.com',
                port: '',
                pathname: '/**'
            },
            {
                protocol: 'https',
                hostname: 'cdn1.theimageapi.com',
                port: '',
                pathname: '/**'
            }
        ]
    }
}

module.exports = nextConfig
