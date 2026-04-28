'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import type { SOPDoc, ContentBlock } from '@/data/sop/meta-ads';
import VideoPlayer from './VideoPlayer';
import { CategoryIcon, IconArrowLeft, IconChevronRight, IconCheck } from './Icons';
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
                    <Block key={bi} block={block} accentHex={category.accentHex} />
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

function Block({ block, accentHex }: { block: ContentBlock; accentHex: string }) {
  switch (block.type) {

    case 'text':
      return <p className={styles.bodyText}>{block.content}</p>;

    case 'bold-text':
      return (
        <p className={styles.bodyText} style={{ fontWeight: 700, color: '#1a1a2e' }}>
          {block.content}
        </p>
      );

    case 'divider':
      return <div style={{ height: 2, background: '#dcdcec', margin: '8px 0', borderRadius: 2 }} />;

    case 'list':
      return (
        <ul className={styles.list}>
          {block.items.map((item, i) => (
            <li key={i} className={styles.listItem}>
              {block.ordered ? (
                <span className={styles.listBullet} style={{ background: accentHex }}>
                  {i + 1}
                </span>
              ) : (
                <span className={styles.listDot} style={{ background: accentHex, marginTop: 9 }} />
              )}
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );

    case 'table':
      return (
        <div style={{ overflowX: 'auto', margin: '8px 0' }}>
          <table className={styles.table}>
            <thead className={styles.tableHead}>
              <tr>
                {block.headers.map((h, i) => <th key={i}>{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, ri) => (
                <tr key={ri}>
                  {row.map((cell, ci) => <td key={ci}>{cell}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    case 'callout': {
      const variantClass = {
        info:    styles.calloutInfo,
        warning: styles.calloutWarning,
        tip:     styles.calloutTip,
        rule:    styles.calloutRule,
      }[block.variant];

      const labelClass = {
        info:    styles.calloutLabelInfo,
        warning: styles.calloutLabelWarning,
        tip:     styles.calloutLabelTip,
        rule:    styles.calloutLabelRule,
      }[block.variant];

      const icons = {
        info: '●',
        warning: '▲',
        tip: '★',
        rule: '◆',
      };

      return (
        <div className={`${styles.callout} ${variantClass}`} style={{ margin: '6px 0' }}>
          {block.title && (
            <p className={`${styles.calloutLabel} ${labelClass}`}>
              <span>{icons[block.variant]}</span>
              {block.title}
            </p>
          )}
          <p className={styles.calloutText}>{block.content}</p>
        </div>
      );
    }

    case 'steps':
      return (
        <div className={styles.steps}>
          {block.steps.map((step, i) => (
            <div key={i} className={styles.stepItem}>
              <div className={styles.stepLetter} style={{ background: accentHex }}>
                {String.fromCharCode(65 + i)}
              </div>
              <div className={styles.stepCard}>
                <p className={styles.stepCardTitle}>{step.label}</p>
                <div>
                  {step.items.map((item, ii) => (
                    <div key={ii} className={styles.stepCardItem}>
                      <span className={styles.stepCardNum}>{ii + 1}.</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
                {step.result && (
                  <div className={styles.stepResult}>
                    <IconCheck size={12} />
                    {step.result}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      );

    case 'video':
      return <VideoPlayer url={block.url} title={block.title} />;

    case 'image':
      return (
        <div style={{ borderRadius: 10, overflow: 'hidden', border: '1px solid #dcdcec', background: '#f4f4fb', margin: '6px 0' }}>
          <img src={block.url} alt={block.alt} style={{ width: '100%', display: 'block' }} loading="lazy" />
          {block.alt && (
            <p style={{ fontSize: 12, color: '#9090b0', textAlign: 'center', padding: '10px 16px' }}>{block.alt}</p>
          )}
        </div>
      );

    case 'naming':
      return (
        <div style={{ margin: '6px 0' }}>
          {block.rows.map((row, i) => (
            <div key={i} className={styles.namingCard}>
              <p className={styles.namingLabel}>{row.label}</p>
              <code
                style={{
                  display: 'block',
                  fontSize: 13,
                  fontFamily: "'JetBrains Mono', monospace",
                  borderRadius: 6,
                  padding: '8px 12px',
                  color: accentHex,
                  background: `${accentHex}10`,
                  border: `1px solid ${accentHex}22`,
                  lineHeight: 1.6,
                }}
              >
                {row.pattern}
              </code>
              {row.example && (
                <p style={{ fontSize: 11, color: '#9090b0', marginTop: 6, fontFamily: "'JetBrains Mono', monospace" }}>
                  e.g. {row.example}
                </p>
              )}
            </div>
          ))}
        </div>
      );

    default:
      return null;
  }
}
