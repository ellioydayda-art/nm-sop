import { CAE_SHOW_UP_CONFIG } from "@/data/sop/show-up-configs/cae";
import { DR_JASMINE_SHOW_UP_CONFIG } from "@/data/sop/show-up-configs/dr-jasmine";
import type { ShowUpSopConfig } from "@/data/sop/show-up-types";

export const SHOW_UP_SOP_CONFIGS: Record<string, ShowUpSopConfig> = {
  "whatsapp-community-dr-jasmine-show-up": DR_JASMINE_SHOW_UP_CONFIG,
  "whatsapp-community-cae-show-up": CAE_SHOW_UP_CONFIG,
};

export function getShowUpSopConfig(slug: string): ShowUpSopConfig | undefined {
  return SHOW_UP_SOP_CONFIGS[slug];
}
