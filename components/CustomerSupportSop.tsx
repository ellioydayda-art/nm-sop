"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import customerSupportSOP from "@/data/sop/customer-support";
import { CategoryIcon, IconArrowLeft } from "./Icons";
import { SopBlock } from "./SopBlock";
import styles from "./customer-support-sop.module.css";

interface CustomerSupportCategory {
  slug: string;
  name: string;
  department: string;
  description: string;
  accentHex: string;
}

interface CustomerSupportSopProps {
  category: CustomerSupportCategory;
}

const SECTION_TAGS: Record<string, string> = {
  mission: "Start here",
  workspace: "A then B",
  "reply-rules": "Non-negotiables",
  goals: "Scoreboard",
  cadence: "Timing",
  "reminder-playbook": "Funnel beats",
  "when-stuck": "Level up",
  faq: "Speed dial",
};

export default function CustomerSupportSop({ category }: CustomerSupportSopProps) {
  const sop = customerSupportSOP;
  const [activeSection, setActiveSection] = useState(sop.sections[0]?.id ?? "");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        }
      },
      { rootMargin: "-14% 0px -65% 0px", threshold: 0 }
    );
    const nodes = document.querySelectorAll("[data-cs-section]");
    nodes.forEach(n => observer.observe(n));
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
    setActiveSection(id);
  }

  const activeIdx = sop.sections.findIndex(s => s.id === activeSection);

  return (
    <>
      <div className={styles.progressTrack}>
        <div className={styles.progressFill} style={{ width: `${progress}%` }} />
      </div>

      <div className={styles.wrap}>
        <header className={styles.hero}>
          <div className={styles.heroMesh} aria-hidden />
          <div className={styles.heroNoise} aria-hidden />
          <div className={styles.heroInner}>
            <p className={styles.kicker}>
              <span className={styles.kickerDot} aria-hidden />
              Support playbook
            </p>
            <h1 className={styles.title}>Client Success</h1>
            <p className={styles.sub}>{category.description}</p>
          </div>
        </header>

        <div className={styles.layout}>
          <aside className={styles.sidebar}>
            <Link href="/dashboard" className={styles.back}>
              <IconArrowLeft size={12} />
              Dashboard
            </Link>
            <div className={styles.navCard}>
              <p className={styles.navLabel}>Jump to section</p>
              <div
                className="flex items-center gap-2 mb-3 pb-3 border-b"
                style={{ borderColor: "rgba(20,20,31,0.08)" }}
              >
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                  style={{
                    background: `linear-gradient(135deg, ${category.accentHex}22, #a855f722)`,
                    border: `1px solid ${category.accentHex}40`,
                  }}
                >
                  <CategoryIcon slug={category.slug} size={16} style={{ color: category.accentHex }} />
                </div>
                <div>
                  <p className="text-[10px] font-extrabold uppercase tracking-wider text-rose-500 m-0">
                    {category.department}
                  </p>
                  <p className="text-xs font-semibold text-gray-800 dark:text-gray-100 m-0 leading-snug">{sop.title}</p>
                </div>
              </div>
              {sop.sections.map((section, i) => {
                const isActive = activeSection === section.id;
                return (
                  <button
                    key={section.id}
                    type="button"
                    className={`${styles.navBtn} ${isActive ? styles.navBtnActive : ""}`}
                    onClick={() => scrollTo(section.id)}
                  >
                    <span className={styles.navNum}>{String(i + 1).padStart(2, "0")}</span>
                    {section.title}
                  </button>
                );
              })}
              <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-2 px-1">
                {activeIdx + 1} / {sop.sections.length} sections
              </p>
            </div>
          </aside>

          <main className={styles.main}>
            {sop.sections.map(section => (
              <section key={section.id} id={section.id} data-cs-section className={styles.section}>
                <div className={styles.card}>
                  <div className={styles.sectionHead}>
                    <div className={styles.sectionIcon}>
                      <CategoryIcon slug={category.slug} size={22} style={{ color: "#e11d48" }} />
                    </div>
                    <div>
                      <p className={styles.sectionTag}>{SECTION_TAGS[section.id] ?? "Playbook"}</p>
                      <h2 className={styles.sectionTitle}>{section.title}</h2>
                    </div>
                  </div>
                  <div className={styles.blocks}>
                    {section.blocks.map((block, bi) => (
                      <SopBlock key={bi} block={block} accentHex={category.accentHex} />
                    ))}
                  </div>
                </div>
              </section>
            ))}

            <div className={styles.footer}>
              <Link href="/dashboard" className={styles.footerBack}>
                <IconArrowLeft size={14} />
                Back to dashboard
              </Link>
              <span className={styles.footerEnd}>You got this</span>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
