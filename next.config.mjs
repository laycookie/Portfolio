import nextMDX from "@next/mdx";
import bundleAnalyzer from "@next/bundle-analyzer";

const withMDX = nextMDX({
  extension: /\.mdx?$/,
});

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
};

export default withBundleAnalyzer(withMDX(nextConfig));
