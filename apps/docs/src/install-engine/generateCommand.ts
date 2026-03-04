import { PackageManager, InstallMode, VariantKey } from "@/types";

export function generateInstallCommand(
  componentSlug: string,
  variant: VariantKey,
  packageManager: PackageManager,
  mode: InstallMode,
  dependencies: string[] = []
): string {
  if (mode === "manual") {
    const depsString = dependencies.length > 0 ? dependencies.join(" ") : "";
    
    switch (packageManager) {
      case "npm":
        return depsString ? `npm install ${depsString}` : "/* No dependencies required */";
      case "pnpm":
        return depsString ? `pnpm add ${depsString}` : "/* No dependencies required */";
      case "yarn":
        return depsString ? `yarn add ${depsString}` : "/* No dependencies required */";
      case "bun":
        return depsString ? `bun add ${depsString}` : "/* No dependencies required */";
      default:
        return depsString ? `npm install ${depsString}` : "/* No dependencies required */";
    }
  }

  if (mode === "cli") {
    const registryUrl = `https://reactmint.com/r/${componentSlug}-${variant}.json`;

    switch (packageManager) {
      case "npm":
        return `npx reactmint add ${registryUrl}`;
      case "pnpm":
        return `pnpm dlx reactmint add ${registryUrl}`;
      case "yarn":
        return `yarn dlx reactmint add ${registryUrl}`;
      case "bun":
        return `bunx reactmint add ${registryUrl}`;
      default:
        return `npx reactmint add ${registryUrl}`;
    }
  }

  return "";
}
