/**
 * Unlinked build-compatibility route. Public INN content remains in the app
 * router; this valid legacy entry only ensures Next.js 14 emits pages-manifest
 * during static export.
 */
export default function INNBuildCompatibilityRoute() {
  return null;
}
