export interface ShowUpCustomValues {
  workshopDay: string;
  workshopDate: string;
  workshopTime: string;
  zoomLink: string;
  sessionDate: string;
  sessionTime: string;
  zoomId: string;
  zoomPasscode: string;
}

export const SHOW_UP_VALUE_FIELDS: {
  key: keyof ShowUpCustomValues;
  label: string;
  placeholder: string;
  hint: string;
}[] = [
  {
    key: "workshopDay",
    label: "Workshop day",
    placeholder: "Tuesday",
    hint: "Used in 2-day countdown (e.g. Tuesday)",
  },
  {
    key: "workshopDate",
    label: "Workshop date",
    placeholder: "9/6",
    hint: "Short date format (e.g. 9/6)",
  },
  {
    key: "workshopTime",
    label: "Workshop time",
    placeholder: "8PM (GMT +8)",
    hint: "Include timezone (e.g. 8PM (GMT +8))",
  },
  {
    key: "zoomLink",
    label: "Zoom link",
    placeholder: "http://drjasminechiew.com/zoom",
    hint: "Full URL, no spaces",
  },
  {
    key: "sessionDate",
    label: "Session date",
    placeholder: "Jun 9, 2026",
    hint: "Full date for Starting Soon message",
  },
  {
    key: "sessionTime",
    label: "Session time",
    placeholder: "8:00PM – 10:00PM (GMT+8)",
    hint: "Start and end time with timezone",
  },
  {
    key: "zoomId",
    label: "Zoom ID",
    placeholder: "846 0992 4700",
    hint: "Numbers with spaces as shown in Zoom",
  },
  {
    key: "zoomPasscode",
    label: "Zoom passcode",
    placeholder: "8888",
    hint: "Numeric passcode from Zoom",
  },
];

export const DEFAULT_SHOW_UP_VALUES: ShowUpCustomValues = {
  workshopDay: "",
  workshopDate: "",
  workshopTime: "8PM (GMT +8)",
  zoomLink: "http://drjasminechiew.com/zoom",
  sessionDate: "",
  sessionTime: "8:00PM – 10:00PM (GMT+8)",
  zoomId: "846 0992 4700",
  zoomPasscode: "8888",
};

export const SHOW_UP_EXAMPLE_VALUES: ShowUpCustomValues = {
  workshopDay: "Tuesday",
  workshopDate: "9/6",
  workshopTime: "8PM (GMT +8)",
  zoomLink: "http://drjasminechiew.com/zoom",
  sessionDate: "Jun 9, 2026",
  sessionTime: "8:00PM – 10:00PM (GMT+8)",
  zoomId: "846 0992 4700",
  zoomPasscode: "8888",
};

const PLACEHOLDER_MAP: Record<string, keyof ShowUpCustomValues> = {
  "{{WORKSHOP_DAY}}": "workshopDay",
  "{{WORKSHOP_DATE}}": "workshopDate",
  "{{WORKSHOP_TIME}}": "workshopTime",
  "{{ZOOM_LINK}}": "zoomLink",
  "{{SESSION_DATE}}": "sessionDate",
  "{{SESSION_TIME}}": "sessionTime",
  "{{ZOOM_ID}}": "zoomId",
  "{{ZOOM_PASSCODE}}": "zoomPasscode",
};

const STORAGE_KEY = "dr-jasmine-show-up-values";

export function loadShowUpValues(): ShowUpCustomValues {
  if (typeof window === "undefined") return { ...DEFAULT_SHOW_UP_VALUES };
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULT_SHOW_UP_VALUES };
    const parsed = JSON.parse(raw) as Partial<ShowUpCustomValues>;
    return { ...DEFAULT_SHOW_UP_VALUES, ...parsed };
  } catch {
    return { ...DEFAULT_SHOW_UP_VALUES };
  }
}

export function saveShowUpValues(values: ShowUpCustomValues): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(values));
}

function trim(value: string): string {
  return value.trim();
}

function isValidUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

function isValidZoomId(value: string): boolean {
  const digits = value.replace(/\s/g, "");
  return /^\d{9,11}$/.test(digits);
}

export function getPlaceholdersInTemplate(template: string): string[] {
  const matches = template.match(/\{\{[A-Z_]+\}\}/g);
  return matches ? Array.from(new Set(matches)) : [];
}

export function getUsedValueKeys(): (keyof ShowUpCustomValues)[] {
  const keys = new Set<keyof ShowUpCustomValues>();
  for (const token of Object.keys(PLACEHOLDER_MAP)) {
    keys.add(PLACEHOLDER_MAP[token]);
  }
  return Array.from(keys);
}

export function fillShowUpTemplate(template: string, values: ShowUpCustomValues): string {
  let result = template;
  for (const [token, key] of Object.entries(PLACEHOLDER_MAP)) {
    result = result.split(token).join(trim(values[key]));
  }
  return result;
}

export function validateShowUpValue(
  key: keyof ShowUpCustomValues,
  value: string,
): string | null {
  const v = trim(value);

  switch (key) {
    case "workshopDay":
      if (!v) return "Workshop day is required";
      if (v.length < 3) return "Enter the full day name (e.g. Tuesday)";
      return null;
    case "workshopDate":
      if (!v) return "Workshop date is required";
      if (!/^\d{1,2}\/\d{1,2}$/.test(v)) return "Use short date format like 9/6";
      return null;
    case "workshopTime":
      if (!v) return "Workshop time is required";
      if (!/GMT/i.test(v)) return "Include timezone (e.g. GMT +8)";
      return null;
    case "zoomLink":
      if (!v) return "Zoom link is required";
      if (/\s/.test(v)) return "Zoom link cannot contain spaces";
      if (!isValidUrl(v)) return "Enter a valid http:// or https:// URL";
      return null;
    case "sessionDate":
      if (!v) return "Session date is required";
      if (v.length < 6) return "Enter full date (e.g. Jun 9, 2026)";
      return null;
    case "sessionTime":
      if (!v) return "Session time is required";
      if (!/GMT/i.test(v)) return "Include timezone (e.g. GMT+8)";
      return null;
    case "zoomId":
      if (!v) return "Zoom ID is required";
      if (!isValidZoomId(v)) return "Zoom ID should be 9–11 digits (spaces allowed)";
      return null;
    case "zoomPasscode":
      if (!v) return "Zoom passcode is required";
      if (!/^\d{4,8}$/.test(v)) return "Passcode should be 4–8 digits";
      return null;
    default:
      return null;
  }
}

export function validateStepMessage(
  stepId: string,
  template: string,
  values: ShowUpCustomValues,
): { ok: boolean; errors: string[]; filled: string } {
  const errors: string[] = [];
  const placeholders = getPlaceholdersInTemplate(template);

  for (const token of placeholders) {
    const key = PLACEHOLDER_MAP[token];
    if (!key) {
      errors.push(`Unknown placeholder ${token}`);
      continue;
    }
    const fieldError = validateShowUpValue(key, values[key]);
    if (fieldError) {
      errors.push(fieldError);
    }
  }

  const filled = fillShowUpTemplate(template, values);
  const leftover = getPlaceholdersInTemplate(filled);
  if (leftover.length > 0) {
    errors.push(`Message still has unfilled blanks: ${leftover.join(", ")}`);
  }

  if (stepId === "live-now" && filled.includes("==> \n")) {
    errors.push("Zoom link is missing after ==> line");
  }

  const uniqueErrors = Array.from(new Set(errors));
  return { ok: uniqueErrors.length === 0, errors: uniqueErrors, filled };
}
