"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  DR_JASMINE_SHOW_UP_MESSAGES,
  SHOW_UP_SCHEDULE_SUMMARY,
} from "@/data/sop/dr-jasmine-show-up-messages";
import { IconArrowLeft, IconCheck, IconCopy, IconDownload } from "./Icons";
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
  const [activeId, setActiveId] = useState(DR_JASMINE_SHOW_UP_MESSAGES[0]?.id ?? "");
  const [progress, setProgress] = useState(0);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [scheduleCopied, setScheduleCopied] = useState(false);

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

  async function handleCopyMessage(id: string, message: string) {
    if (!message.trim()) return;
    await copyText(message);
    setCopiedId(id);
    window.setTimeout(() => setCopiedId(null), 2500);
  }

  async function handleCopySchedule() {
    await copyText(SHOW_UP_SCHEDULE_SUMMARY);
    setScheduleCopied(true);
    window.setTimeout(() => setScheduleCopied(false), 2500);
  }

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
          <p className={styles.heroSub}>
            {category.description}
          </p>
        </header>

        <div className={styles.layout}>
          <aside className={styles.sidebar}>
            <div className={styles.sidebarCard}>
              <p className={styles.sidebarLabel}>Message sequence</p>
              {DR_JASMINE_SHOW_UP_MESSAGES.map(step => (
                <button
                  key={step.id}
                  type="button"
                  onClick={() => scrollTo(step.id)}
                  className={`${styles.navBtn} ${activeId === step.id ? styles.navBtnActive : ""}`}
                >
                  <span className={styles.navStep}>{step.step}</span>
                  <span>{step.title}</span>
                </button>
              ))}
              <button
                type="button"
                onClick={() => void handleCopySchedule()}
                className={styles.copyScheduleBtn}
              >
                {scheduleCopied ? <IconCheck size={14} /> : <IconCopy size={14} />}
                {scheduleCopied ? "Schedule copied" : "Copy full schedule"}
              </button>
            </div>
          </aside>

          <main className={styles.main}>
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

            {DR_JASMINE_SHOW_UP_MESSAGES.map(step => (
              <article
                key={step.id}
                id={step.id}
                data-showup-step
                className={styles.messageCard}
              >
                <div className={styles.cardHeader}>
                  <span className={styles.cardStepBadge}>{step.step}</span>
                  <div className={styles.cardTitleBlock}>
                    <h2 className={styles.cardTitle}>{step.title}</h2>
                    <div className={styles.metaRow}>
                      <span className={styles.metaPill}>{step.timing}</span>
                      <span className={styles.metaPill}>Send at {step.sendAt}</span>
                    </div>
                  </div>
                  {step.message.trim() ? (
                    <button
                      type="button"
                      onClick={() => void handleCopyMessage(step.id, step.message)}
                      className={`${styles.copyBtn} ${copiedId === step.id ? styles.copyBtnDone : ""}`}
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
                  <div>
                    <p className={styles.sectionLabel}>Before sending, check</p>
                    <ul className={styles.checklist}>
                      {step.checklist.map(item => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  {step.variables.length > 0 ? (
                    <div>
                      <p className={styles.sectionLabel}>Update these each session</p>
                      <div className={styles.variables}>
                        {step.variables.map(variable => (
                          <span key={variable} className={styles.variableTag}>
                            {variable}
                          </span>
                        ))}
                      </div>
                    </div>
                  ) : null}

                  {step.image ? (
                    <div>
                      <p className={styles.sectionLabel}>
                        {step.id === "live-sticker" ? "Sticker reference" : "Image to attach"}
                      </p>
                      <div className={styles.imageBlock}>
                        <Image
                          src={step.image.src}
                          alt={step.image.alt}
                          width={800}
                          height={600}
                          className={styles.imagePreview}
                          unoptimized
                        />
                        <div className={styles.imageActions}>
                          <a
                            href={step.image.src}
                            download={step.image.downloadName}
                            className={styles.downloadBtn}
                          >
                            <IconDownload size={14} />
                            Download image
                          </a>
                        </div>
                      </div>
                    </div>
                  ) : null}

                  {step.notes && step.notes.length > 0 ? (
                    <div className={styles.noteBox}>
                      {step.notes.map(note => (
                        <p key={note}>{note}</p>
                      ))}
                    </div>
                  ) : null}

                  {step.message.trim() ? (
                    <div>
                      <p className={styles.sectionLabel}>Message template</p>
                      <div className={styles.messageBlock}>
                        <div className={styles.messageHeader}>
                          <span className={styles.messageLabel}>Paste into WhatsApp Community</span>
                          <button
                            type="button"
                            onClick={() => void handleCopyMessage(step.id, step.message)}
                            className={`${styles.copyBtn} ${copiedId === step.id ? styles.copyBtnDone : ""}`}
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
                        <pre className={styles.messageText}>{step.message}</pre>
                      </div>
                    </div>
                  ) : null}
                </div>
              </article>
            ))}

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
