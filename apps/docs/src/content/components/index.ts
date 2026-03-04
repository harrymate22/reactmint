import { splitTextComponent } from "./split-text";

export const componentsList = [splitTextComponent];

export function getComponentBySlug(slug: string) {
  return componentsList.find((c) => c.slug === slug);
}
