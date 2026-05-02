'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import type { SOPDoc } from '@/data/sop/meta-ads';
import { CategoryIcon, IconArrowLeft } from './Icons';
import { SopBlock } from './SopBlock';
import styles from './sop-viewer.module.css';

interface SopViewerCategory {
  slug: string;
  department: string;
  description: string;
  accentHex: string;
}

interface SopViewerProps {
  sop: SOPDoc;
  category: SopViewerCategory;
}

export default function SopViewer({ sop, category }: SopViewerProps) {
  const [activeSection, setActiveSection] = useState(sop.sections[0]?.id ?? '');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        }
      },
      { rootMargin: '-15% 0px -70% 0px', threshold: 0 }
    );
    const els = document.querySelectorAll('[data-section]');
    els.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    function onScroll() {
      const doc = document.documentElement;
      const scrolled = doc.scrollTop;
      const total = doc.scrollHeight - doc.clientHeight;
      setProgress(total > 0 ? (scrolled / total) * 100 : 0);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setActiveSection(id);
  }

  const activeIdx = sop.sections.findIndex(s => s.id === activeSection);

  return (
    <>
      {/* Reading progress bar */}
      <div className="fixed top-14 left-0 right-0 z-30 h-0.5 bg-[var(--border)]">
        <div
          className="h-full transition-all duration-100"
          style={{ width: `${progress}%`, background: `linear-gradient(90deg, ${category.accentHex}, #06d6a0)` }}
        />
      </div>

      <div className={styles.sopWrapper}>

        {/* ── Hero ─────────────────────────────────────────── */}
        <div className={styles.hero}>
          <div className={styles.heroGlow} style={{ background: category.accentHex }} />

          <span className={styles.badge} style={{ background: category.accentHex }}>
            {category.department} SOP v1.0
          </span>

          <h1 className={styles.heroTitle}>
            {sop.title.replace(' SOP', '')}
          </h1>

          <div className={styles.heroAccentLine} style={{ background: `linear-gradient(90deg, ${category.accentHex}, ${category.accentHex}50)` }} />

          <p className={styles.heroSub}>{category.description}</p>
          <p className={styles.heroDept}>{sop.sections.length} sections · {category.department}</p>
        </div>

        {/* ── Layout ───────────────────────────────────────── */}
        <div className={styles.layout}>

          {/* Sidebar */}
          <aside className={styles.sidebar}>
            <Link href="/dashboard" className={styles.sidebarBack}>
              <IconArrowLeft size={11} />
              Dashboard
            </Link>

            <div className={styles.sidebarMeta}>
              <div
                className="w-8 h-8 rounded-lg border flex items-center justify-center mb-2"
                style={{ backgroundColor: `${category.accentHex}14`, borderColor: `${category.accentHex}30` }}
              >
                <CategoryIcon slug={category.slug} size={15} style={{ color: category.accentHex } as React.CSSProperties} />
              </div>
              <p className={styles.sidebarDept} style={{ color: category.accentHex }}>{category.department}</p>
              <p className={styles.sidebarTitle}>{sop.title}</p>
            </div>

            <div className={styles.progressBar}>
              <div
                className={styles.progressFill}
                style={{ width: `${((activeIdx + 1) / sop.sections.length) * 100}%`, background: category.accentHex }}
              />
            </div>
            <p className={styles.progressText}>{activeIdx + 1} of {sop.sections.length}</p>

            <nav style={{ flex: 1 }}>
              {sop.sections.map((section, i) => {
                const isActive = activeSection === section.id;
                return (
                  <button
                    key={section.id}
                    onClick={() => scrollTo(section.id)}
                    className={`${styles.navBtn} ${isActive ? styles.navBtnActive : ''}`}
                  >
                    {isActive && (
                      <span className={styles.navIndicator} style={{ background: category.accentHex }} />
                    )}
                    <span
                      className={`${styles.navNum} ${isActive ? styles.navNumActive : ''}`}
                      style={isActive ? { color: category.accentHex } : {}}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {section.title}
                  </button>
                );
              })}
            </nav>
          </aside>

          {/* ── Main content ─────────────────────────────── */}
          <main className={styles.main}>
            {sop.sections.map((section, i) => (
              <section
                key={section.id}
                id={section.id}
                data-section
                className={`${styles.section} ${i === 0 ? styles.sectionFirst : ''} scroll-mt-10`}
              >
                {/* Section header */}
                <div className={styles.sectionHeader}>
                  <div className={styles.sectionNum} style={{ background: category.accentHex }}>
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <div>
                    <h2 className={styles.sectionTitle}>{section.title}</h2>
                    <div
                      className={styles.sectionRule}
                      style={{ background: `linear-gradient(90deg, ${category.accentHex}, ${category.accentHex}40)` }}
                    />
                  </div>
                </div>

                <div style={{ paddingLeft: 70 }}>
                  {section.blocks.map((block, bi) => (
                    <SopBlock key={bi} block={block} accentHex={category.accentHex} />
                  ))}
                </div>
              </section>
            ))}

            <div className={styles.footer}>
              <Link href="/dashboard" className={styles.footerBack}>
                <IconArrowLeft size={13} />
                Back to dashboard
              </Link>
              <span className={styles.footerEnd}>End of SOP</span>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
