import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Lock tracing to this app directory when another lockfile exists higher in the tree
  // (e.g. C:\Users\...\package-lock.json), so this project is not treated as a monorepo root.
  outputFileTracingRoot: __dirname,
};

export default nextConfig;
