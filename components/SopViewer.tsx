'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import type { SOPDoc, ContentBlock } from '@/data/sop/meta-ads';
import VideoPlayer from './VideoPlayer';
import { CategoryIcon, IconArrowLeft, IconChevronRight, IconCheck } from './Icons';
import styles from './sop-viewer.module.css';
import { createClient } from '@supabase/supabase-js';

interface SopViewerCategory {
  slug: string;
  department: string;
  description: string;
  accentHex: string;
}

interface SopViewerProps {
  sop: SOPDoc;
  category: SopViewerCategory;
  isAdmin: boolean;
}

type SaveStatus = 'saving' | 'saved' | 'failed' | 'dirty';

interface SopRealtimeRow {
  slug: string;
  content: SOPDoc;
  updated_at?: string;
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export default function SopViewer({ sop, category, isAdmin }: SopViewerProps) {
  const [doc, setDoc] = useState<SOPDoc>(sop);
  const [activeSection, setActiveSection] = useState(sop.sections[0]?.id ?? '');
  const [progress, setProgress] = useState(0);
  const [saveStatus, setSaveStatus] = useState<SaveStatus>('saved');
  const [lastSavedAt, setLastSavedAt] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const revisionRef = useRef(0);
  const savedRevisionRef = useRef(0);
  const requestCounterRef = useRef(0);

  useEffect(() => {
    setDoc(sop);
    setActiveSection(sop.sections[0]?.id ?? '');
    setSaveStatus('saved');
    revisionRef.current = 0;
    savedRevisionRef.current = 0;
  }, [sop]);

  useEffect(() => {
    return () => {
      if (saveTimerRef.current) {
        clearTimeout(saveTimerRef.current);
      }
    };
  }, []);

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
    if (!supabaseUrl || !supabaseAnonKey) return;
    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });

    const channel = supabase
      .channel(`sop-live-${category.slug}`)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'sop_documents', filter: `slug=eq.${category.slug}` },
        payload => {
          const row = payload.new as SopRealtimeRow;
          if (!row?.content) return;
          // Ignore older remote snapshots while local edits are not acknowledged yet.
          if (savedRevisionRef.current < revisionRef.current) return;
          setDoc(row.content);
          if (row.updated_at) {
            setLastSavedAt(new Date(row.updated_at).toLocaleTimeString());
          }
          setSaveStatus('saved');
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [category.slug]);

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

  useEffect(() => {
    const interval = setInterval(() => {
      void fetch(`/api/admin/sop/${category.slug}`)
        .then(response => response.json())
        .then(data => {
          if (data.content && savedRevisionRef.current >= revisionRef.current) {
            setDoc(data.content as SOPDoc);
            if (typeof data.updatedAt === 'string') {
              setLastSavedAt(new Date(data.updatedAt).toLocaleTimeString());
            }
          }
        })
        .catch(() => {
          // Keep current state if sync fails.
        });
    }, 15000);

    return () => clearInterval(interval);
  }, [category.slug]);

  const activeIdx = doc.sections.findIndex(s => s.id === activeSection);

  function writePath(source: SOPDoc, path: string, value: string): SOPDoc {
    const clone = JSON.parse(JSON.stringify(source)) as SOPDoc;
    const segments = path.split('.');
    let current: unknown = clone;
    for (let i = 0; i < segments.length - 1; i += 1) {
      const key = segments[i];
      if (typeof current !== 'object' || current === null || !(key in current)) {
        return source;
      }
      current = (current as Record<string, unknown>)[key];
    }
    if (typeof current !== 'object' || current === null) return source;
    const last = segments[segments.length - 1];
    (current as Record<string, unknown>)[last] = value;
    return clone;
  }

  async function saveDoc(nextDoc: SOPDoc, saveRevision: number) {
    if (!isAdmin) return;
    const requestId = requestCounterRef.current + 1;
    requestCounterRef.current = requestId;
    setSaveStatus('saving');
    try {
      const response = await fetch(`/api/admin/sop/${category.slug}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: nextDoc }),
      });
      if (!response.ok) {
        const errorBody = (await response.json().catch(() => ({}))) as { error?: string };
        throw new Error(errorBody.error ?? 'Save failed');
      }
      const data = (await response.json()) as { updatedAt?: string };
      if (requestId !== requestCounterRef.current) {
        return;
      }
      savedRevisionRef.current = saveRevision;
      setSaveStatus('saved');
      setSaveError(null);
      if (typeof data.updatedAt === 'string') {
        setLastSavedAt(new Date(data.updatedAt).toLocaleTimeString());
      } else {
        setLastSavedAt(new Date().toLocaleTimeString());
      }
    } catch (error: unknown) {
      if (requestId !== requestCounterRef.current) {
        return;
      }
      setSaveError(error instanceof Error ? error.message : 'Unable to sync to server.');
      setSaveStatus('failed');
    }
  }

  function updateText(path: string, value: string) {
    const nextDoc = writePath(doc, path, value);
    setDoc(nextDoc);
    const nextRevision = revisionRef.current + 1;
    revisionRef.current = nextRevision;
    setSaveStatus('dirty');
    setSaveError(null);
    if (saveTimerRef.current) {
      clearTimeout(saveTimerRef.current);
    }
    saveTimerRef.current = setTimeout(() => {
      void saveDoc(nextDoc, nextRevision);
    }, 700);
  }

  function retrySave() {
    if (!isAdmin) return;
    void saveDoc(doc, revisionRef.current);
  }

  useEffect(() => {
    if (!isAdmin || saveStatus !== 'failed') return;
    const timer = setTimeout(() => {
      void saveDoc(doc, revisionRef.current);
    }, 3000);
    return () => clearTimeout(timer);
  }, [doc, isAdmin, saveStatus]);

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
            <EditableText
              value={doc.title}
              isAdmin={isAdmin && !isPreviewMode}
              path="title"
              onChange={updateText}
              className={styles.heroTitle}
              multiline={false}
            />
          </h1>

          <div className={styles.heroAccentLine} style={{ background: `linear-gradient(90deg, ${category.accentHex}, ${category.accentHex}50)` }} />

          <p className={styles.heroSub}>{category.description}</p>
          <p className={styles.heroDept}>{doc.sections.length} sections · {category.department}</p>
          {isAdmin && (
            <p className={styles.heroDept} style={{ marginTop: 8 }}>
              {saveStatus === 'saving'
                ? 'Saving...'
                : saveStatus === 'saved'
                  ? `Saved${lastSavedAt ? ` at ${lastSavedAt}` : ''}`
                  : saveStatus === 'failed'
                    ? 'Save failed. Changes are local until retry succeeds.'
                    : 'Unsaved changes'}
            </p>
          )}
          {isAdmin && saveStatus === 'failed' && saveError && (
            <p className={styles.heroDept} style={{ marginTop: 4, color: '#c62828' }}>
              {saveError}
            </p>
          )}
          {isAdmin && (
            <button
              type="button"
              onClick={() => setIsPreviewMode((value) => !value)}
              className={styles.sidebarBack}
              style={{ marginTop: 8, width: 'fit-content' }}
            >
              {isPreviewMode ? 'Back to edit' : 'Preview'}
            </button>
          )}
          {isAdmin && saveStatus === 'failed' && (
            <button
              type="button"
              onClick={retrySave}
              className={styles.sidebarBack}
              style={{ marginTop: 8, width: 'fit-content' }}
            >
              Retry save
            </button>
          )}
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
              <p className={styles.sidebarTitle}>{doc.title}</p>
            </div>

            <div className={styles.progressBar}>
              <div
                className={styles.progressFill}
                style={{ width: `${((activeIdx + 1) / doc.sections.length) * 100}%`, background: category.accentHex }}
              />
            </div>
            <p className={styles.progressText}>{activeIdx + 1} of {doc.sections.length}</p>

            <nav style={{ flex: 1 }}>
              {doc.sections.map((section, i) => {
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
            {doc.sections.map((section, i) => (
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
                    <EditableText
                      value={section.title}
                      isAdmin={isAdmin && !isPreviewMode}
                      path={`sections.${i}.title`}
                      onChange={updateText}
                      className={styles.sectionTitle}
                      multiline={false}
                    />
                    <div
                      className={styles.sectionRule}
                      style={{ background: `linear-gradient(90deg, ${category.accentHex}, ${category.accentHex}40)` }}
                    />
                  </div>
                </div>

                <div style={{ paddingLeft: 70 }}>
                  {section.blocks.map((block, bi) => (
                    <Block key={bi} block={block} accentHex={category.accentHex} isAdmin={isAdmin && !isPreviewMode} sectionIndex={i} blockIndex={bi} onChange={updateText} />
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

function Block({
  block,
  accentHex,
  isAdmin,
  sectionIndex,
  blockIndex,
  onChange,
}: {
  block: ContentBlock;
  accentHex: string;
  isAdmin: boolean;
  sectionIndex: number;
  blockIndex: number;
  onChange: (path: string, value: string) => void;
}) {
  const basePath = `sections.${sectionIndex}.blocks.${blockIndex}`;
  switch (block.type) {

    case 'text':
      return <EditableText value={block.content} isAdmin={isAdmin} path={`${basePath}.content`} onChange={onChange} className={styles.bodyText} />;

    case 'bold-text':
      return (
        <EditableText value={block.content} isAdmin={isAdmin} path={`${basePath}.content`} onChange={onChange} className={styles.bodyText} style={{ fontWeight: 700, color: '#1a1a2e' }} />
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
              <EditableText value={item} isAdmin={isAdmin} path={`${basePath}.items.${i}`} onChange={onChange} />
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
                {block.headers.map((h, i) => (
                  <th key={i}>
                    <EditableText value={h} isAdmin={isAdmin} path={`${basePath}.headers.${i}`} onChange={onChange} multiline={false} />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, ri) => (
                <tr key={ri}>
                  {row.map((cell, ci) => (
                    <td key={ci}>
                      <EditableText value={cell} isAdmin={isAdmin} path={`${basePath}.rows.${ri}.${ci}`} onChange={onChange} multiline={false} />
                    </td>
                  ))}
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
              <EditableText value={block.title ?? ''} isAdmin={isAdmin} path={`${basePath}.title`} onChange={onChange} multiline={false} />
            </p>
          )}
          <EditableText value={block.content} isAdmin={isAdmin} path={`${basePath}.content`} onChange={onChange} className={styles.calloutText} />
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
                <EditableText value={step.label} isAdmin={isAdmin} path={`${basePath}.steps.${i}.label`} onChange={onChange} className={styles.stepCardTitle} multiline={false} />
                <div>
                  {step.items.map((item, ii) => (
                    <div key={ii} className={styles.stepCardItem}>
                      <span className={styles.stepCardNum}>{ii + 1}.</span>
                      <EditableText value={item} isAdmin={isAdmin} path={`${basePath}.steps.${i}.items.${ii}`} onChange={onChange} />
                    </div>
                  ))}
                </div>
                {step.result && (
                  <div className={styles.stepResult}>
                    <IconCheck size={12} />
                    <EditableText value={step.result} isAdmin={isAdmin} path={`${basePath}.steps.${i}.result`} onChange={onChange} multiline={false} />
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
            <EditableText value={block.alt} isAdmin={isAdmin} path={`${basePath}.alt`} onChange={onChange} style={{ fontSize: 12, color: '#9090b0', textAlign: 'center', padding: '10px 16px' }} />
          )}
        </div>
      );

    case 'naming':
      return (
        <div style={{ margin: '6px 0' }}>
          {block.rows.map((row, i) => (
            <div key={i} className={styles.namingCard}>
              <EditableText value={row.label} isAdmin={isAdmin} path={`${basePath}.rows.${i}.label`} onChange={onChange} className={styles.namingLabel} multiline={false} />
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
                <EditableText value={row.pattern} isAdmin={isAdmin} path={`${basePath}.rows.${i}.pattern`} onChange={onChange} multiline={false} />
              </code>
              {row.example && (
                <p style={{ fontSize: 11, color: '#9090b0', marginTop: 6, fontFamily: "'JetBrains Mono', monospace" }}>
                  e.g. <EditableText value={row.example} isAdmin={isAdmin} path={`${basePath}.rows.${i}.example`} onChange={onChange} multiline={false} />
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

function EditableText({
  value,
  isAdmin,
  path,
  onChange,
  className,
  multiline = true,
  style,
}: {
  value: string;
  isAdmin: boolean;
  path: string;
  onChange: (path: string, value: string) => void;
  className?: string;
  multiline?: boolean;
  style?: React.CSSProperties;
}) {
  if (!isAdmin) {
    return (
      <span className={className} style={style}>
        {value}
      </span>
    );
  }

  if (!multiline) {
    return (
      <input
        className={`${className ?? ''} input`}
        value={value}
        onChange={event => onChange(path, event.target.value)}
        style={style}
      />
    );
  }

  return (
    <textarea
      className={`${className ?? ''} input`}
      value={value}
      onChange={event => onChange(path, event.target.value)}
      style={style}
      rows={Math.max(2, value.split('\n').length)}
    />
  );
}
