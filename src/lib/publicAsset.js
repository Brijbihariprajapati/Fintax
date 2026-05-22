/** Public folder paths for files under /public/assets (handles spaces & special chars). */
export function publicAsset(filename) {
  return `/assets/${encodeURIComponent(filename)}`;
}
