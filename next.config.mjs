/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns:[
            {
                protocol:"https",
                hostname:'res.cloudinary.com'
            }
        ]
    },
    experimental: {
        serverActions: {
            bodySizeLimit: '20mb' // set desired value here.
        }
    }
};

export default nextConfig;
