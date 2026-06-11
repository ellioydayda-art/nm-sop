export interface ShowUpMessageStep {
  id: string;
  step: string;
  title: string;
  timing: string;
  sendAt: string;
  checklist: string[];
  message: string;
  image?: {
    src: string;
    downloadName: string;
    alt: string;
    allowDownload?: boolean;
  };
  stickerOnly?: boolean;
  notes?: string[];
}

export interface CombinedScheduleItem {
  day: string;
  time: string;
  type: "show-up" | "value-post";
  label: string;
  note?: string;
  stepId?: string;
}

export interface ShowUpValueField {
  key: string;
  label: string;
  placeholder: string;
  hint: string;
}

export type ShowUpCustomValues = Record<string, string>;

export interface ShowUpSopTheme {
  id: "dr-jasmine" | "cae";
}

export interface ShowUpSopConfig {
  theme: ShowUpSopTheme;
  storageKey: string;
  heroBadge: string;
  heroTitle: string;
  valueFields: ShowUpValueField[];
  defaultValues: ShowUpCustomValues;
  exampleValues: ShowUpCustomValues;
  placeholderMap: Record<string, string>;
  messages: ShowUpMessageStep[];
  scheduleSummary: string;
  combinedSchedule: CombinedScheduleItem[];
  showValuePostSection: boolean;
  valuePostFixedSlots?: string[];
  valuePostAlternateRule?: { title: string; body: string };
  valuePostSopSlug?: string;
}
