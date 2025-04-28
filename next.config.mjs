import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // webpack(config, { isServer }) {
  //   // Add the loader for .node files
  //   config.module.rules.push({
  //     test: /\.node$/,
  //     use: 'node-loader',
  //   });
  //   // Ensure to pass the config to the next step
  //   return config;
  // },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
