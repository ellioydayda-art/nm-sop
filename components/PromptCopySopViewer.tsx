"use client";

import { useState } from "react";
import Link from "next/link";
import type { SOPDoc } from "@/data/sop/meta-ads";
import { CategoryIcon, IconArrowLeft, IconCopy, IconCheck } from "./Icons";
import styles from "./prompt-copy-sop-viewer.module.css";

interface PromptCopySopViewerCategory {
  slug: string;
  department: string;
  description: string;
  accentHex: string;
}

interface PromptCopySopViewerProps {
  sop: SOPDoc;
  category: PromptCopySopViewerCategory;
}

export default function PromptCopySopViewer({ sop, category }: PromptCopySopViewerProps) {
  const [copied, setCopied] = useState(false);
  const prompt = sop.fullPrompt ?? "";

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = prompt;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.hero}>
        <div className={styles.heroGlow} style={{ background: category.accentHex }} />
        <Link href="/dashboard" className={styles.backLink}>
          <IconArrowLeft size={12} />
          Dashboard
        </Link>
        <span className={styles.badge} style={{ background: category.accentHex }}>
          {category.department} · AI Prompt
        </span>
        <h1 className={styles.heroTitle}>{sop.title}</h1>
        <p className={styles.heroSub}>
          Copy the entire prompt below and paste it into a new AI chat before drafting any value post.
        </p>
      </div>

      <div className={styles.copyBar}>
        <button
          type="button"
          onClick={() => void handleCopy()}
          className={`${styles.copyBtn} ${copied ? styles.copyBtnDone : ""}`}
          style={{ background: copied ? "#059669" : category.accentHex }}
        >
          {copied ? (
            <>
              <IconCheck size={18} />
              Copied to clipboard
            </>
          ) : (
            <>
              <IconCopy size={18} />
              Copy this prompt
            </>
          )}
        </button>
        <p className={styles.copyHint}>One click copies everything. No need to select text manually.</p>
      </div>

      <div className={styles.content}>
        <div className={styles.promptCard}>
          <div className={styles.promptCardHeader}>
            <div
              className={styles.promptIcon}
              style={{ backgroundColor: `${category.accentHex}14`, borderColor: `${category.accentHex}30` }}
            >
              <CategoryIcon slug={category.slug} size={16} style={{ color: category.accentHex }} />
            </div>
            <div>
              <p className={styles.promptLabel}>Full prompt</p>
              <p className={styles.promptMeta}>Ready to paste into ChatGPT, Claude, or any AI chat</p>
            </div>
            <button
              type="button"
              onClick={() => void handleCopy()}
              className={styles.copyBtnSecondary}
              style={{ borderColor: `${category.accentHex}40`, color: category.accentHex }}
            >
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
          <pre className={styles.promptText}>{prompt}</pre>
        </div>

        <div className={styles.footer}>
          <Link href="/dashboard" className={styles.footerBack}>
            <IconArrowLeft size={13} />
            Back to dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
