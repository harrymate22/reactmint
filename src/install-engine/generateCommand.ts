import { PackageManager, InstallMode, VariantKey } from "@/types";

export function generateInstallCommand(
  componentSlug: string,
  variant: VariantKey,
  packageManager: PackageManager,
  mode: InstallMode,
  dependencies: string[] = [] // Optional dependencies if we need to show a manual deps list
): string {
  // If no npm package is published yet, manual mode shows the pure dependencies installation.
  if (mode === "manual") {
    // Note: Once a pure structural NPM package (@reactmint/ui) exists, this would change to actual library installs.
    // E.g., npm install @reactmint/split-text
    const depsString = dependencies.length > 0 ? dependencies.join(" ") : "";
    
    // Instead of forcing the user into a fake package that errors, tell them what to install manually
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

  // CLI Mode assumes the URL-based Shadcn registry strategy.
  if (mode === "cli") {
    const registryUrl = `https://reactmint.com/r/${componentSlug}-${variant}.json`;

    switch (packageManager) {
      case "npm":
        return `npx shadcn@latest add ${registryUrl}`;
      case "pnpm":
        return `pnpm dlx shadcn@latest add ${registryUrl}`;
      case "yarn":
        return `yarn dlx shadcn@latest add ${registryUrl}`;
      case "bun":
        return `bunx shadcn@latest add ${registryUrl}`;
      default:
        return `npx shadcn@latest add ${registryUrl}`;
    }
  }

  return "";
}
