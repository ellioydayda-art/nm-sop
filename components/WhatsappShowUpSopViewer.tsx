"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  COMBINED_COMMUNITY_SCHEDULE,
  DR_JASMINE_SHOW_UP_MESSAGES,
  SHOW_UP_SCHEDULE_SUMMARY,
  VALUE_POST_ALTERNATE_RULE,
  VALUE_POST_FIXED_SLOTS,
  VALUE_POST_SOP_SLUG,
  type CombinedScheduleItem,
} from "@/data/sop/dr-jasmine-show-up-messages";
import {
  DEFAULT_SHOW_UP_VALUES,
  SHOW_UP_EXAMPLE_VALUES,
  SHOW_UP_VALUE_FIELDS,
  fillShowUpTemplate,
  getPlaceholdersInTemplate,
  loadShowUpValues,
  saveShowUpValues,
  validateShowUpValue,
  validateStepMessage,
  type ShowUpCustomValues,
} from "@/lib/show-up-template";
import { IconArrowLeft, IconCheck, IconChevronRight, IconCopy, IconDownload } from "./Icons";
import styles from "./whatsapp-show-up-sop-viewer.module.css";

interface WhatsappShowUpSopViewerCategory {
  slug: string;
  name: string;
  department: string;
  description: string;
  accentHex: string;
}

interface WhatsappShowUpSopViewerProps {
  category: WhatsappShowUpSopViewerCategory;
}

async function copyText(text: string): Promise<void> {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
  }
}

export default function WhatsappShowUpSopViewer({ category }: WhatsappShowUpSopViewerProps) {
  const [values, setValues] = useState<ShowUpCustomValues>(DEFAULT_SHOW_UP_VALUES);
  const [valuesReady, setValuesReady] = useState(false);
  const [activeId, setActiveId] = useState(DR_JASMINE_SHOW_UP_MESSAGES[0]?.id ?? "");
  const [progress, setProgress] = useState(0);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [scheduleCopied, setScheduleCopied] = useState(false);
  const [copyErrorId, setCopyErrorId] = useState<string | null>(null);

  useEffect(() => {
    setValues(loadShowUpValues());
    setValuesReady(true);
  }, []);

  useEffect(() => {
    if (!valuesReady) return;
    saveShowUpValues(values);
  }, [values, valuesReady]);

  const stepResults = useMemo(() => {
    const map = new Map<string, ReturnType<typeof validateStepMessage>>();
    for (const step of DR_JASMINE_SHOW_UP_MESSAGES) {
      if (!step.message.trim()) {
        map.set(step.id, { ok: true, errors: [], filled: "" });
      } else {
        map.set(step.id, validateStepMessage(step.id, step.message, values));
      }
    }
    return map;
  }, [values]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        }
      },
      { rootMargin: "-12% 0px -65% 0px", threshold: 0 }
    );
    const nodes = document.querySelectorAll("[data-showup-step]");
    nodes.forEach(node => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    function onScroll() {
      const doc = document.documentElement;
      const scrolled = doc.scrollTop;
      const total = doc.scrollHeight - doc.clientHeight;
      setProgress(total > 0 ? (scrolled / total) * 100 : 0);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveId(id);
  }

  function updateValue(key: keyof ShowUpCustomValues, next: string) {
    setValues(prev => ({ ...prev, [key]: next }));
    setCopyErrorId(null);
  }

  function loadExampleValues() {
    setValues({ ...SHOW_UP_EXAMPLE_VALUES });
    setCopyErrorId(null);
  }

  function resetValues() {
    setValues({ ...DEFAULT_SHOW_UP_VALUES });
    setCopyErrorId(null);
  }

  async function handleCopyMessage(stepId: string, template: string) {
    const result = stepResults.get(stepId);
    if (!result) return;

    if (!result.ok) {
      setCopyErrorId(stepId);
      return;
    }

    await copyText(result.filled);
    setCopiedId(stepId);
    setCopyErrorId(null);
    window.setTimeout(() => setCopiedId(null), 2500);
  }

  async function handleCopySchedule() {
    await copyText(SHOW_UP_SCHEDULE_SUMMARY);
    setScheduleCopied(true);
    window.setTimeout(() => setScheduleCopied(false), 2500);
  }

  const copyableSteps = DR_JASMINE_SHOW_UP_MESSAGES.filter(step => step.message.trim());
  const messagesReady = copyableSteps.filter(step => stepResults.get(step.id)?.ok).length;

  const scheduleByDay = useMemo(() => {
    const groups: { day: string; items: CombinedScheduleItem[] }[] = [];
    for (const item of COMBINED_COMMUNITY_SCHEDULE) {
      const last = groups[groups.length - 1];
      if (last && last.day === item.day) {
        last.items.push(item);
      } else {
        groups.push({ day: item.day, items: [item] });
      }
    }
    return groups;
  }, []);

  const fieldsWithErrors = SHOW_UP_VALUE_FIELDS.filter(
    field => validateShowUpValue(field.key, values[field.key]) !== null
  ).length;

  return (
    <>
      <div className={styles.progressTrack}>
        <div className={styles.progressFill} style={{ width: `${progress}%` }} />
      </div>

      <div className={styles.wrapper}>
        <header className={styles.hero}>
          <div className={styles.heroGlow} aria-hidden />
          <Link href="/dashboard" className={styles.backLink}>
            <IconArrowLeft size={12} />
            Dashboard
          </Link>
          <span className={styles.badge}>WhatsApp Community · Show Up Sequence</span>
          <h1 className={styles.heroTitle}>[Dr Jasmine] Community Show Up SOP</h1>
          <p className={styles.heroSub}>{category.description}</p>
        </header>

        <div className={styles.layout}>
          <aside className={styles.sidebar}>
            <div className={styles.sidebarCard}>
              <p className={styles.sidebarLabel}>Message sequence</p>
              {DR_JASMINE_SHOW_UP_MESSAGES.map(step => {
                const result = stepResults.get(step.id);
                const needsFill = getPlaceholdersInTemplate(step.message).length > 0;
                return (
                  <button
                    key={step.id}
                    type="button"
                    onClick={() => scrollTo(step.id)}
                    className={`${styles.navBtn} ${activeId === step.id ? styles.navBtnActive : ""}`}
                  >
                    <span className={styles.navStep}>{step.step}</span>
                    <span className={styles.navTitle}>{step.title}</span>
                    {needsFill ? (
                      <span
                        className={`${styles.navStatus} ${result?.ok ? styles.navStatusOk : styles.navStatusWarn}`}
                        title={result?.ok ? "Ready to copy" : "Fill Custom Values first"}
                      >
                        {result?.ok ? "✓" : "!"}
                      </span>
                    ) : null}
                  </button>
                );
              })}
              <button
                type="button"
                onClick={() => void handleCopySchedule()}
                className={styles.copyScheduleBtn}
              >
                {scheduleCopied ? <IconCheck size={14} /> : <IconCopy size={14} />}
                {scheduleCopied ? "Schedule copied" : "Copy full schedule"}
              </button>
              <button
                type="button"
                onClick={() => scrollTo("value-post-slots")}
                className={styles.valuePostNavBtn}
              >
                Value Post slots
              </button>
            </div>
          </aside>

          <main className={styles.main}>
            <section className={styles.valuesCard} id="custom-values">
              <div className={styles.valuesHeader}>
                <div>
                  <p className={styles.valuesEyebrow}>Step 0 · Fill once, applies to all messages</p>
                  <h2 className={styles.valuesTitle}>Custom Values</h2>
                  <p className={styles.valuesDesc}>
                    Enter session details here. Every message below updates automatically.
                    Copy is blocked until all required fields for that message are valid.
                  </p>
                </div>
                <div className={styles.valuesActions}>
                  <button type="button" onClick={loadExampleValues} className={styles.valuesActionBtn}>
                    Load example
                  </button>
                  <button type="button" onClick={resetValues} className={styles.valuesActionBtnSecondary}>
                    Reset
                  </button>
                </div>
              </div>

              <div className={styles.valuesStatusRow}>
                <span className={styles.valuesStatusPill}>
                  {messagesReady} / {copyableSteps.length} messages ready to copy
                </span>
                {fieldsWithErrors > 0 ? (
                  <span className={styles.valuesStatusWarn}>
                    {fieldsWithErrors} field{fieldsWithErrors === 1 ? "" : "s"} need attention
                  </span>
                ) : (
                  <span className={styles.valuesStatusOk}>All custom values look good</span>
                )}
              </div>

              <div className={styles.valuesGrid}>
                {SHOW_UP_VALUE_FIELDS.map(field => {
                  const error = validateShowUpValue(field.key, values[field.key]);
                  return (
                    <label key={field.key} className={styles.valueField}>
                      <span className={styles.valueLabel}>{field.label}</span>
                      <input
                        type="text"
                        value={values[field.key]}
                        onChange={event => updateValue(field.key, event.target.value)}
                        placeholder={field.placeholder}
                        className={`${styles.valueInput} ${error ? styles.valueInputError : ""}`}
                        spellCheck={false}
                      />
                      {error ? (
                        <span className={styles.valueError}>{error}</span>
                      ) : (
                        <span className={styles.valueHint}>{field.hint}</span>
                      )}
                    </label>
                  );
                })}
              </div>
            </section>

            <div className={styles.timelineCard}>
              <p className={styles.timelineTitle}>Quick reference timeline</p>
              <div className={styles.timelineGrid}>
                {DR_JASMINE_SHOW_UP_MESSAGES.map(step => (
                  <button
                    key={`timeline-${step.id}`}
                    type="button"
                    className={styles.timelineItem}
                    onClick={() => scrollTo(step.id)}
                  >
                    <p className={styles.timelineStep}>{step.step}</p>
                    <p className={styles.timelineName}>{step.title}</p>
                    <p className={styles.timelineWhen}>
                      {step.timing} · {step.sendAt}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {DR_JASMINE_SHOW_UP_MESSAGES.map(step => {
              const result = stepResults.get(step.id);
              const hasMessage = step.message.trim().length > 0;
              const canCopy = hasMessage && (result?.ok ?? false);
              const showErrors = copyErrorId === step.id && result && !result.ok;

              return (
                <article
                  key={step.id}
                  id={step.id}
                  data-showup-step
                  className={`${styles.messageCard} ${step.stickerOnly ? styles.messageCardSticker : ""}`}
                >
                  <div className={styles.cardHeader}>
                    <span className={`${styles.cardStepBadge} ${step.stickerOnly ? styles.cardStepBadgeSticker : ""}`}>
                      {step.step}
                    </span>
                    <div className={styles.cardTitleBlock}>
                      <h2 className={styles.cardTitle}>{step.title}</h2>
                      <div className={styles.metaRow}>
                        {step.stickerOnly ? (
                          <span className={styles.metaPillSticker}>STICKER ONLY · IN WHATSAPP APP</span>
                        ) : null}
                        <span className={styles.metaPill}>{step.timing}</span>
                        <span className={styles.metaPill}>Send at {step.sendAt}</span>
                        {hasMessage && getPlaceholdersInTemplate(step.message).length > 0 ? (
                          <span
                            className={`${styles.metaPill} ${canCopy ? styles.metaPillOk : styles.metaPillWarn}`}
                          >
                            {canCopy ? "Ready to copy" : "Fill Custom Values"}
                          </span>
                        ) : null}
                      </div>
                    </div>
                    {hasMessage ? (
                      <button
                        type="button"
                        onClick={() => void handleCopyMessage(step.id, step.message)}
                        className={`${styles.copyBtn} ${copiedId === step.id ? styles.copyBtnDone : ""} ${!canCopy ? styles.copyBtnDisabled : ""}`}
                        disabled={!canCopy}
                        title={canCopy ? "Copy filled message" : "Fill Custom Values first"}
                      >
                        {copiedId === step.id ? (
                          <>
                            <IconCheck size={14} />
                            Copied
                          </>
                        ) : (
                          <>
                            <IconCopy size={14} />
                            Copy message
                          </>
                        )}
                      </button>
                    ) : null}
                  </div>

                  <div className={styles.cardBody}>
                    {step.stickerOnly ? (
                      <div className={styles.stickerCriticalBanner} role="alert">
                        <p className={styles.stickerCriticalTitle}>DO NOT DOWNLOAD THIS STICKER</p>
                        <p className={styles.stickerCriticalText}>
                          Send the sticker from <strong>inside WhatsApp only</strong>. Open the community chat,
                          tap the <strong>sticker icon</strong>, and pick the matching sticker.
                        </p>
                        <ul className={styles.stickerCriticalList}>
                          <li>Do NOT download the image below</li>
                          <li>Do NOT upload it from your gallery</li>
                          <li>Do NOT screenshot and send as a photo</li>
                          <li>The picture below is <strong>reference only</strong> so you know which sticker to tap</li>
                        </ul>
                      </div>
                    ) : null}

                    {showErrors && result ? (
                      <div className={styles.errorBox}>
                        <p className={styles.errorBoxTitle}>Cannot copy yet. Fix these first:</p>
                        <ul>
                          {result.errors.map(error => (
                            <li key={error}>{error}</li>
                          ))}
                        </ul>
                      </div>
                    ) : null}

                    <div>
                      <p className={styles.sectionLabel}>Before sending, check</p>
                      <ul className={styles.checklist}>
                        {step.checklist.map(item => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>

                    {step.image ? (
                      <div>
                        <p className={styles.sectionLabel}>
                          {step.stickerOnly ? "Reference only (look, do not download)" : "Image to attach"}
                        </p>
                        <div className={`${styles.imageBlock} ${step.stickerOnly ? styles.imageBlockSticker : ""}`}>
                          <div className={styles.imagePreviewWrap}>
                            <Image
                              src={step.image.src}
                              alt={step.image.alt}
                              width={800}
                              height={600}
                              className={styles.imagePreview}
                              unoptimized
                              draggable={false}
                              onContextMenu={step.stickerOnly ? event => event.preventDefault() : undefined}
                            />
                            {step.stickerOnly ? (
                              <div className={styles.imageOverlay} aria-hidden>
                                REFERENCE ONLY
                              </div>
                            ) : null}
                          </div>
                          <div className={styles.imageActions}>
                            {step.image.allowDownload !== false ? (
                              <a
                                href={step.image.src}
                                download={step.image.downloadName}
                                className={styles.downloadBtn}
                              >
                                <IconDownload size={14} />
                                Download image
                              </a>
                            ) : (
                              <div className={styles.noDownloadBar}>
                                <span className={styles.noDownloadIcon}>⛔</span>
                                <span>
                                  <strong>Download disabled.</strong> Use the sticker inside WhatsApp app only.
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ) : null}

                    {step.notes && step.notes.length > 0 ? (
                      <div className={step.stickerOnly ? styles.stickerNoteBox : styles.noteBox}>
                        {step.stickerOnly ? (
                          <p className={styles.stickerNoteBoxTitle}>Reminder</p>
                        ) : null}
                        {step.notes.map(note => (
                          <p key={note}>{note}</p>
                        ))}
                      </div>
                    ) : null}

                    {hasMessage ? (
                      <div>
                        <p className={styles.sectionLabel}>
                          {canCopy ? "Filled message (ready to paste)" : "Message preview"}
                        </p>
                        <div className={styles.messageBlock}>
                          <div className={styles.messageHeader}>
                            <span className={styles.messageLabel}>
                              {canCopy
                                ? "Paste into WhatsApp Community"
                                : "Complete Custom Values above to unlock copy"}
                            </span>
                            <button
                              type="button"
                              onClick={() => void handleCopyMessage(step.id, step.message)}
                              className={`${styles.copyBtn} ${copiedId === step.id ? styles.copyBtnDone : ""} ${!canCopy ? styles.copyBtnDisabled : ""}`}
                              disabled={!canCopy}
                            >
                              {copiedId === step.id ? (
                                <>
                                  <IconCheck size={14} />
                                  Copied
                                </>
                              ) : (
                                <>
                                  <IconCopy size={14} />
                                  Copy
                                </>
                              )}
                            </button>
                          </div>
                          <pre className={styles.messageText}>
                            {canCopy ? result?.filled : fillShowUpTemplate(step.message, values)}
                          </pre>
                          {!canCopy && getPlaceholdersInTemplate(step.message).length > 0 ? (
                            <p className={styles.previewNote}>
                              Blanks like {"{{WORKSHOP_DAY}}"} will be replaced once Custom Values are filled correctly.
                            </p>
                          ) : null}
                        </div>
                      </div>
                    ) : null}
                  </div>
                </article>
              );
            })}

            <section className={styles.valuePostSection} id="value-post-slots">
              <div className={styles.valuePostSectionHeader}>
                <div>
                  <p className={styles.valuePostEyebrow}>Slot in between reminders</p>
                  <h2 className={styles.valuePostTitle}>When to Post Value Posts</h2>
                  <p className={styles.valuePostDesc}>
                    Show Up messages drive attendance. Value Posts warm the community in between.
                    Use the schedule below to see where each value post fits around the reminder sequence.
                  </p>
                </div>
                <Link href={`/sop/${VALUE_POST_SOP_SLUG}`} className={styles.valuePostSopLink}>
                  <span>Value Post Prompt SOP</span>
                  <IconChevronRight size={14} />
                </Link>
              </div>

              <div className={styles.valuePostRules}>
                <p className={styles.valuePostRulesTitle}>Fixed value post slots</p>
                <ul className={styles.valuePostRulesList}>
                  {VALUE_POST_FIXED_SLOTS.map(rule => (
                    <li key={rule}>{rule}</li>
                  ))}
                </ul>
              </div>

              <div className={styles.alternateDayBanner} role="alert">
                <p className={styles.alternateDayTitle}>{VALUE_POST_ALTERNATE_RULE.title}</p>
                <p className={styles.alternateDayBody}>{VALUE_POST_ALTERNATE_RULE.body}</p>
              </div>

              <div className={styles.combinedTimeline}>
                <div className={styles.combinedTimelineHead}>
                  <p className={styles.combinedTimelineTitle}>Full posting schedule</p>
                  <div className={styles.combinedTimelineLegend}>
                    <span className={styles.legendShowUp}>Show Up</span>
                    <span className={styles.legendValuePost}>Value Post</span>
                  </div>
                </div>

                <div className={styles.scheduleDayGroups}>
                  {scheduleByDay.map(group => (
                    <div key={group.day} className={styles.scheduleDayGroup}>
                      <div className={styles.scheduleDayHeader}>
                        <span className={styles.scheduleDayLabel}>{group.day}</span>
                      </div>
                      <div className={styles.scheduleDayItems}>
                        {group.items.map(item => (
                          <div
                            key={`${group.day}-${item.time}-${item.label}`}
                            className={`${styles.scheduleRow} ${item.type === "show-up" ? styles.scheduleRowShowUp : styles.scheduleRowValuePost}`}
                          >
                            <span className={styles.scheduleRowTime}>{item.time}</span>
                            <div className={styles.scheduleRowBody}>
                              <div className={styles.scheduleRowTop}>
                                <span className={styles.scheduleRowTitle}>{item.label}</span>
                                <span className={styles.scheduleRowType}>
                                  {item.type === "show-up" ? "Show Up" : "Value Post"}
                                </span>
                              </div>
                              {item.note ? (
                                <p className={styles.scheduleRowNote}>{item.note}</p>
                              ) : null}
                              {item.stepId ? (
                                <button
                                  type="button"
                                  onClick={() => scrollTo(item.stepId ?? "")}
                                  className={styles.scheduleRowAction}
                                >
                                  Jump to message →
                                </button>
                              ) : (
                                <Link href={`/sop/${VALUE_POST_SOP_SLUG}`} className={styles.scheduleRowAction}>
                                  Open Value Post SOP →
                                </Link>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <div className={styles.footer}>
              <Link href="/dashboard" className={styles.footerBack}>
                <IconArrowLeft size={13} />
                Back to dashboard
              </Link>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
