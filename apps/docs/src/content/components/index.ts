import { splitTextComponent } from "./split-text";
import { inputComponent } from "./input";

export const componentsList = [splitTextComponent, inputComponent];

export function getComponentBySlug(slug: string) {
  return componentsList.find((c) => c.slug === slug);
}
