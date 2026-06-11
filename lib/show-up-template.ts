import type { ShowUpCustomValues, ShowUpSopConfig } from "@/data/sop/show-up-types";

export type { ShowUpCustomValues } from "@/data/sop/show-up-types";

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
  const matches = template.match(/\{\{[A-Z_0-9]+\}\}/g);
  return matches ? Array.from(new Set(matches)) : [];
}

export function fillShowUpTemplate(
  template: string,
  values: ShowUpCustomValues,
  placeholderMap: Record<string, string>,
): string {
  let result = template;
  for (const [token, key] of Object.entries(placeholderMap)) {
    const value = values[key];
    result = result.split(token).join(value ? trim(value) : "");
  }
  return result;
}

export function validateShowUpValue(
  key: string,
  value: string,
  config: ShowUpSopConfig,
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
  config: ShowUpSopConfig,
): { ok: boolean; errors: string[]; filled: string } {
  const errors: string[] = [];
  const placeholders = getPlaceholdersInTemplate(template);

  for (const token of placeholders) {
    const key = config.placeholderMap[token];
    if (!key) {
      errors.push(`Unknown placeholder ${token}`);
      continue;
    }
    const fieldError = validateShowUpValue(key, values[key] ?? "", config);
    if (fieldError) {
      errors.push(fieldError);
    }
  }

  const filled = fillShowUpTemplate(template, values, config.placeholderMap);
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

export function loadShowUpValues(config: ShowUpSopConfig): ShowUpCustomValues {
  if (typeof window === "undefined") return { ...config.defaultValues };
  try {
    const raw = window.localStorage.getItem(config.storageKey);
    if (!raw) return { ...config.defaultValues };
    const parsed = JSON.parse(raw) as Record<string, unknown>;
    const merged: ShowUpCustomValues = { ...config.defaultValues };
    for (const key of Object.keys(config.defaultValues)) {
      const value = parsed[key];
      if (typeof value === "string") {
        merged[key] = value;
      }
    }
    return merged;
  } catch {
    return { ...config.defaultValues };
  }
}

export function saveShowUpValues(config: ShowUpSopConfig, values: ShowUpCustomValues): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(config.storageKey, JSON.stringify(values));
}
