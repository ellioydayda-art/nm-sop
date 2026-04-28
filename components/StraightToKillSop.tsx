'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import type { Category } from '@/data/categories';
import { IconArrowLeft, IconChevronRight } from './Icons';
import styles from './straight-to-kill.module.css';

const SECTIONS = [
  { id: 'overview',  label: 'Overview',               num: '00' },
  { id: 'step-1',    label: 'Step 01 — Brief the AI',  num: '01' },
  { id: 'step-2',    label: 'Step 02 — Headlines',     num: '02' },
  { id: 'step-3',    label: 'Step 03 — Choose & Assign', num: '03' },
  { id: 'step-4',    label: 'Step 04 — Generate',      num: '04' },
  { id: 'qc',        label: 'QC Before Publishing',    num: 'QC' },
];

const PROMPT_1 = `I'm running a [webinar / live workshop / free event] called [EVENT NAME] for [TARGET AUDIENCE].

I've attached the landing page design (screenshot) and the full copy below.

Please read both carefully and understand:
- The main promise or transformation
- The pain points the audience faces
- What makes this event unique
- The credibility of the host

I'll use this context in the next step to generate ad creative headlines.

[PASTE YOUR LANDING PAGE COPY HERE]`;

const PROMPT_2 = `Using the event context you just read, generate 10 bold ad creative headlines for my [EVENT NAME].

Use these proven fill-in-the-blank templates. Replace [TOPIC], [AUDIENCE], [OUTCOME] with relevant terms from the landing page:

1. WHAT IF EVERYTHING YOU THOUGHT YOU KNEW ABOUT [TOPIC] WAS WRONG?
2. THE REAL REASON YOUR [TOPIC] ISN'T WORKING IN 2026
3. YOUR [TOPIC] STRATEGY IS BROKEN (HERE'S WHY)
4. HERE'S WHAT NOBODY TELLS YOU ABOUT [TOPIC]
5. THE BIGGEST MISTAKE [AUDIENCE] MAKE WITH [TOPIC]
6. WHY [TOPIC] FEELS HARD (AND HOW TO FIX IT)
7. WHAT ACTUALLY MAKES [TOPIC] WORK IN 2026
8. WANT MASSIVE [OUTCOME] IN 2026? READ THIS.
9. FREE [EVENT TYPE]: HOW TO [ACHIEVE OUTCOME] WITHOUT [PAIN POINT]
10. FINALLY: [BENEFIT] WITHOUT [PAIN POINT]`;

const REF_IMAGES = ['A', 'B', 'C', 'D', 'E', 'F'];
const EXAMPLE_IMAGES = ['1', '2', '3', '4', '5', '6', '7', '8'];

function ImgCard({ src, alt, dlName }: { src: string; alt: string; dlName: string }) {
  const [broken, setBroken] = useState(false);
  return (
    <div className={styles.imgCard}>
      {broken ? (
        <div className={styles.imgPlaceholder}>
          <span className={styles.imgPlaceholderIcon}>▣</span>
          <span>{alt}</span>
          <span className={styles.imgPlaceholderFile}>{dlName}</span>
        </div>
      ) : (
        <img src={src} alt={alt} onError={() => setBroken(true)} />
      )}
      {!broken && <a className={styles.dlBtn} download={dlName} href={src}>↓ Download</a>}
    </div>
  );
}

interface Props { category: Category }

export default function StraightToKillSop({ category }: Props) {
  const [activeSection, setActiveSection] = useState('overview');
  const [progress, setProgress] = useState(0);
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        for (const e of entries) {
          if (e.isIntersecting) setActiveSection(e.target.id);
        }
      },
      { rootMargin: '-15% 0px -70% 0px', threshold: 0 }
    );
    const els = document.querySelectorAll('[data-stk-section]');
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

  function copyText(id: string, text: string) {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(id);
      setTimeout(() => setCopied(null), 2000);
    });
  }

  const activeIdx = SECTIONS.findIndex(s => s.id === activeSection);

  return (
    <>
      {/* Reading progress bar */}
      <div className="fixed top-14 left-0 right-0 z-30 h-0.5 bg-[var(--border)]">
        <div
          className="h-full transition-all duration-100"
          style={{ width: `${progress}%`, background: `linear-gradient(90deg, ${category.accentHex}, #e63030)` }}
        />
      </div>

      <div className="flex min-h-[calc(100vh-56px)]">
        {/* ── Sidebar ───────────────────────────────────────── */}
        <aside className="hidden md:flex flex-col w-60 shrink-0 border-r border-[var(--border)] bg-[var(--bg)] sticky top-14 h-[calc(100vh-56px)] overflow-y-auto py-5 px-2.5">

          <Link
            href="/dashboard"
            className="flex items-center gap-2 text-xs text-[var(--muted)] hover:text-[var(--text)] transition-colors mb-5 px-2 group"
          >
            <IconArrowLeft size={12} className="group-hover:-translate-x-0.5 transition-transform" />
            <span>Dashboard</span>
          </Link>

          <div className="px-2 mb-4">
            <div
              className="w-8 h-8 rounded-lg border flex items-center justify-center mb-2"
              style={{ backgroundColor: `${category.accentHex}14`, borderColor: `${category.accentHex}30` }}
            >
              <span className="text-[11px] font-black" style={{ color: category.accentHex }}>STK</span>
            </div>
            <p className="text-[10px] font-bold uppercase tracking-widest mb-0.5" style={{ color: category.accentHex }}>
              {category.department}
            </p>
            <h2 className="text-xs font-semibold text-[var(--text)] leading-snug">Straight to Kill — Ad Creative</h2>
          </div>

          {/* Progress bar */}
          <div className="px-2 mb-4">
            <div className="h-1 rounded-full bg-[var(--border)] overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{ width: `${((activeIdx + 1) / SECTIONS.length) * 100}%`, backgroundColor: category.accentHex }}
              />
            </div>
            <p className="text-[10px] text-[var(--subtle)] mt-1.5">
              {activeIdx + 1} of {SECTIONS.length}
            </p>
          </div>

          <nav className="flex-1 space-y-0.5">
            {SECTIONS.map((s) => {
              const isActive = activeSection === s.id;
              return (
                <button
                  key={s.id}
                  onClick={() => scrollTo(s.id)}
                  className={`w-full text-left px-2.5 py-2 rounded-lg text-sm transition-all duration-200 flex items-center gap-2.5 group relative ${
                    isActive
                      ? 'text-[var(--text)] bg-[var(--raised)]'
                      : 'text-[var(--muted)] hover:text-[var(--text)] hover:bg-[var(--raised)]/50'
                  }`}
                >
                  {isActive && (
                    <span
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-4 rounded-r-full"
                      style={{ backgroundColor: category.accentHex }}
                    />
                  )}
                  <span
                    className={`text-[10px] font-mono shrink-0 w-4 ${isActive ? 'opacity-100' : 'opacity-40'}`}
                    style={isActive ? { color: category.accentHex } : {}}
                  >
                    {s.num}
                  </span>
                  <span className="leading-tight text-xs">{s.label}</span>
                </button>
              );
            })}
          </nav>
        </aside>

        {/* ── Main content ────────────────────────────────── */}
        <main className={styles.sopWrapper}>

          {/* Hero */}
          <div className={styles.hero}>
            <div className={styles.badge}>Marketing SOP v1.0</div>
            <h1 className={styles.heroTitle}>
              Straight To Kill<br />
              <span className={styles.heroAccent}>Ad Creative</span>
            </h1>
            <p className={styles.heroSub}>
              A repeatable system to produce scroll-stopping social media image creatives for any webinar, live event, or free workshop campaign.
            </p>
            <div className={styles.kern}>Inspired by Frank Kern</div>
          </div>

          <div className={styles.container}>

            {/* ── Overview ────────────────────── */}
            <div id="overview" data-stk-section className={`${styles.section} ${styles.sectionFirst}`}>
              <div className={styles.divider} />
              <p className={styles.bodyText}>
                This playbook walks your team through 4 clear steps to produce a batch of 8 high-impact ad creatives for any campaign. No design experience needed. Just follow the steps.
              </p>
              <div className={styles.infoRow}>
                <div className={styles.infoCard}>
                  <div className={styles.infoLabel}>What you'll produce</div>
                  <div className={styles.infoText}>8 individual 1080×1080 image creatives ready for Facebook and Instagram ads</div>
                </div>
                <div className={`${styles.infoCard} ${styles.infoCardGreen}`}>
                  <div className={styles.infoLabel}>Who this is for</div>
                  <div className={styles.infoText}>Marketing team members running paid ads for coaches, consultants, or service businesses</div>
                </div>
                <div className={`${styles.infoCard} ${styles.infoCardBlue}`}>
                  <div className={styles.infoLabel}>What you'll need</div>
                  <div className={styles.infoText}>Landing page copy + event details + an AI tool (Claude, ChatGPT, etc.)</div>
                </div>
                <div className={`${styles.infoCard} ${styles.infoCardYellow}`}>
                  <div className={styles.infoLabel}>Output format</div>
                  <div className={styles.infoText}>Save files as JPG or PNG, 1080×1080px each</div>
                </div>
              </div>
            </div>

            {/* ── Step 1 ──────────────────────── */}
            <div id="step-1" data-stk-section className={styles.section}>
              <div className={styles.stepHeader}>
                <div className={styles.stepNum}>01</div>
                <div>
                  <div className={styles.stepTitle}>
                    Brief the AI
                    <small className={styles.stepSub}>Upload your landing page and copy to give it full context</small>
                  </div>
                </div>
              </div>
              <div className={styles.divider} />
              <p className={styles.bodyText}>
                Start by uploading your event landing page (as a screenshot or PDF) along with the full copywriting text. This gives the AI the context it needs to generate relevant, on-brand headlines.
              </p>

              <div className={styles.langBox}>
                <strong>Copy in another language?</strong> Just type it out in that language directly, or translate it yourself before pasting in.
              </div>

              <div className={styles.promptBox}>
                <div className={styles.promptLabel}>Step 1 Prompt — Copy and Paste This</div>
                <button
                  className={`${styles.copyBtn} ${copied === 'p1' ? styles.copyBtnDone : ''}`}
                  onClick={() => copyText('p1', PROMPT_1)}
                >
                  {copied === 'p1' ? 'Copied!' : 'Copy'}
                </button>
                <div className={styles.promptText}>
                  {`I'm running a `}<span className={styles.bracket}>[webinar / live workshop / free event]</span>{` called `}<span className={styles.bracket}>[EVENT NAME]</span>{` for `}<span className={styles.bracket}>[TARGET AUDIENCE]</span>{`.\n\nI've attached the landing page design (screenshot) and the full copy below.\n\nPlease read both carefully and understand:\n- The main promise or transformation\n- The pain points the audience faces\n- What makes this event unique\n- The credibility of the host\n\nI'll use this context in the next step to generate ad creative headlines.\n\n`}<span className={styles.bracket}>[PASTE YOUR LANDING PAGE COPY HERE]</span>
                </div>
              </div>

              <ul className={styles.checklist}>
                {[
                  'Screenshot the full landing page OR export as PDF and attach to your AI tool',
                  'Copy-paste all text from the landing page into the prompt',
                  'Include the event name, host name, and target audience',
                  'Confirm the AI has understood the core promise before moving on',
                ].map((item, i) => (
                  <li key={i} className={styles.checklistItem}>
                    <span className={styles.checkmark}>✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* ── Step 2 ──────────────────────── */}
            <div id="step-2" data-stk-section className={styles.section}>
              <div className={styles.stepHeader}>
                <div className={styles.stepNum}>02</div>
                <div>
                  <div className={styles.stepTitle}>
                    Generate 10 Headlines
                    <small className={styles.stepSub}>Use proven fill-in-the-blank templates to create options</small>
                  </div>
                </div>
              </div>
              <div className={styles.divider} />
              <p className={styles.bodyText}>
                These headline templates are proven scroll-stoppers from high-performing social media ads. They work by challenging a belief, creating curiosity, or promising a specific outcome.
              </p>
              <p className={styles.bodyText}>Attach the reference images below when sending this prompt to your AI:</p>

              <div className={styles.promptBox}>
                <div className={styles.promptLabel}>Step 2 Prompt — Copy and Paste This</div>
                <button
                  className={`${styles.copyBtn} ${copied === 'p2' ? styles.copyBtnDone : ''}`}
                  onClick={() => copyText('p2', PROMPT_2)}
                >
                  {copied === 'p2' ? 'Copied!' : 'Copy'}
                </button>
                <div className={styles.promptText}>
                  {`Using the event context you just read, generate 10 bold ad creative headlines for my `}<span className={styles.bracket}>[EVENT NAME]</span>{`.\n\nUse these proven fill-in-the-blank templates. Replace [TOPIC], [AUDIENCE], [OUTCOME] with relevant terms from the landing page:\n\n`}
                  {[
                    'WHAT IF EVERYTHING YOU THOUGHT YOU KNEW ABOUT [TOPIC] WAS WRONG?',
                    'THE REAL REASON YOUR [TOPIC] ISN\'T WORKING IN 2026',
                    'YOUR [TOPIC] STRATEGY IS BROKEN (HERE\'S WHY)',
                    'HERE\'S WHAT NOBODY TELLS YOU ABOUT [TOPIC]',
                    'THE BIGGEST MISTAKE [AUDIENCE] MAKE WITH [TOPIC]',
                    'WHY [TOPIC] FEELS HARD (AND HOW TO FIX IT)',
                    'WHAT ACTUALLY MAKES [TOPIC] WORK IN 2026',
                    'WANT MASSIVE [OUTCOME] IN 2026? READ THIS.',
                    'FREE [EVENT TYPE]: HOW TO [ACHIEVE OUTCOME] WITHOUT [PAIN POINT]',
                    'FINALLY: [BENEFIT] WITHOUT [PAIN POINT]',
                  ].map((t, i) => (
                    <span key={i}>{`${i + 1}. `}<span className={styles.bracket}>{t.replace(/\[([^\]]+)\]/g, '') && ''}</span>{t.split(/(\[[^\]]+\])/).map((part, j) =>
                      part.startsWith('[') ? <span key={j} className={styles.bracket}>{part}</span> : part
                    )}{'\n'}</span>
                  ))}
                </div>
              </div>

              <p className={styles.bodyText}><strong>Attach these reference images to your prompt</strong> so the AI understands the visual style. Hover to download:</p>

              <div className={styles.imgGrid}>
                {REF_IMAGES.map(l => (
                  <ImgCard
                    key={l}
                    src={`/sop/image-ads/reference_${l}.png`}
                    alt={`Reference ${l}`}
                    dlName={`reference_${l}.png`}
                  />
                ))}
              </div>

              <p className={styles.bodyText}><strong>The fill-in-the-blank formulas at a glance:</strong></p>
              <table className={styles.templateTable}>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Formula</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['WHAT IF EVERYTHING YOU THOUGHT YOU KNEW ABOUT', '[TOPIC]', 'WAS WRONG?'],
                    ['THE REAL REASON YOUR', '[TOPIC]', "ISN'T WORKING IN 2026"],
                    ['YOUR', '[TOPIC]', "STRATEGY IS BROKEN (HERE'S WHY)"],
                    ["HERE'S WHAT NOBODY TELLS YOU ABOUT", '[TOPIC]', ''],
                    ['THE BIGGEST MISTAKE', '[AUDIENCE]', 'MAKE WITH [TOPIC]'],
                    ['WHY', '[TOPIC]', 'FEELS HARD (AND HOW TO FIX IT)'],
                    ['WHAT ACTUALLY MAKES', '[TOPIC]', 'WORK IN 2026'],
                    ['WANT MASSIVE', '[OUTCOME]', 'IN 2026? READ THIS.'],
                    ['FREE', '[EVENT TYPE]', ': HOW TO [ACHIEVE OUTCOME] WITHOUT [PAIN POINT]'],
                    ['FINALLY:', '[BENEFIT]', 'WITHOUT [PAIN POINT]'],
                  ].map((row, i) => (
                    <tr key={i}>
                      <td className={styles.tableNum}>{i + 1}</td>
                      <td className={styles.tableFormula}>
                        {row[0] && <>{row[0]} </>}
                        <span className={styles.blank}>{row[1]}</span>
                        {row[2] && <> {row[2].split(/(\[[^\]]+\])/).map((p, j) =>
                          p.startsWith('[') ? <span key={j} className={styles.blank}>{p}</span> : p
                        )}</>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* ── Step 3 ──────────────────────── */}
            <div id="step-3" data-stk-section className={styles.section}>
              <div className={styles.stepHeader}>
                <div className={styles.stepNum}>03</div>
                <div>
                  <div className={styles.stepTitle}>
                    Choose Your Headlines
                    <small className={styles.stepSub}>Pick 8 winners, assign colours and highlight words</small>
                  </div>
                </div>
              </div>
              <div className={styles.divider} />
              <p className={styles.bodyText}>
                From the 10 generated headlines, select 8 to move forward with. Aim for variety — pick headlines that attack the problem from different angles.
              </p>

              <div className={styles.infoRow}>
                <div className={styles.infoCard}>
                  <div className={styles.infoLabel}>Pick a mix of</div>
                  <div className={styles.infoText}>2× curiosity-gap, 2× challenge-belief, 2× benefit-led, 2× urgency/CTA</div>
                </div>
                <div className={`${styles.infoCard} ${styles.infoCardGreen}`}>
                  <div className={styles.infoLabel}>Assign highlight word</div>
                  <div className={styles.infoText}>Pick 1 key word or phrase per headline to highlight in a contrasting colour block</div>
                </div>
                <div className={`${styles.infoCard} ${styles.infoCardBlue}`}>
                  <div className={styles.infoLabel}>Assign a tag label</div>
                  <div className={styles.infoText}>Each card needs a small top tag. Keep it credible: "ROOT CAUSE", "EYE-OPENER", "FREE WORKSHOP"</div>
                </div>
              </div>

              <p className={styles.bodyText}><strong>Assign one background colour per card. No repeats:</strong></p>
              <div className={styles.palette}>
                {[
                  { color: '#D92B2B', label: 'Red' },
                  { color: '#1A1A2E', label: 'Dark Navy' },
                  { color: '#1B7A3E', label: 'Green' },
                  { color: '#5B2D8E', label: 'Purple' },
                  { color: '#E05A00', label: 'Orange' },
                  { color: '#0D7377', label: 'Teal' },
                  { color: '#A8005A', label: 'Magenta' },
                  { color: '#1340C8', label: 'Blue' },
                ].map(s => (
                  <div key={s.color} className={styles.swatch} style={{ background: s.color }}>
                    {s.label}
                    <span className={styles.swatchSub}>{s.color}</span>
                  </div>
                ))}
              </div>

              <div className={styles.doDont}>
                <div className={styles.doCol}>
                  <div className={styles.doColTitle}>Good Tag Examples</div>
                  <ul>
                    {['FREE WORKSHOP', 'MEDICALLY OVERLOOKED', 'EYE-OPENER', 'ROOT CAUSE', 'REAL RESULTS', 'WHAT WORKS IN 2026', 'FREE LIVE SESSION'].map(t => (
                      <li key={t} className={styles.doItem}>{t}</li>
                    ))}
                  </ul>
                </div>
                <div className={styles.dontCol}>
                  <div className={styles.dontColTitle}>Avoid These Tags</div>
                  <ul>
                    {['TRUTH BOMB (too informal)', 'SHOCKING (clickbait)', 'MUST READ (generic)', 'HOT TAKE (not credible)', 'GAME CHANGER (overused)', 'Emojis in tags'].map(t => (
                      <li key={t} className={styles.dontItem}>{t}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* ── Step 4 ──────────────────────── */}
            <div id="step-4" data-stk-section className={styles.section}>
              <div className={styles.stepHeader}>
                <div className={styles.stepNum}>04</div>
                <div>
                  <div className={styles.stepTitle}>
                    Generate the Images
                    <small className={styles.stepSub}>Brief the AI with your selected headlines to produce all 8 creatives</small>
                  </div>
                </div>
              </div>
              <div className={styles.divider} />
              <p className={styles.bodyText}>
                With your selected headlines, tag labels, highlight words, and colour assignments ready, tell the AI how many headlines you have chosen and share the full list. The AI will handle the design based on the reference style you provided earlier.
              </p>

              <div className={styles.step4Grid}>
                <div className={styles.step4Card}>
                  <div className={styles.step4CardTitle}>What to tell the AI</div>
                  <div className={styles.step4CardText}>
                    Share your list of selected headlines with their assigned background colour, tag label, and highlight word for each card. Example:<br /><br />
                    <span className={styles.inlineCode}>Card 1: Red (#D92B2B) | Tag: FREE WORKSHOP | Headline: THE REAL REASON YOUR BLOOD SUGAR ISN'T GOING DOWN | Highlight: BLOOD SUGAR</span>
                  </div>
                </div>
                <div className={styles.step4Card}>
                  <div className={styles.step4CardTitle}>Output format</div>
                  <div className={styles.step4CardText}>
                    Ask the AI to save each file as JPG or PNG, 1080×1080px. Name them clearly:<br /><br />
                    <span className={styles.inlineCode}>01_short_description.jpg</span><br />
                    <span className={styles.inlineCode}>02_short_description.png</span>
                  </div>
                </div>
              </div>

              <p className={styles.bodyText} style={{ marginTop: 28 }}>
                <strong>Example output — real Straight To Kill creatives made with this SOP.</strong> Hover to download:
              </p>

              <div className={styles.imgGrid}>
                {REF_IMAGES.map(l => (
                  <ImgCard key={l} src={`/sop/image-ads/reference_${l}.png`} alt={`Reference ${l}`} dlName={`reference_${l}.png`} />
                ))}
                {EXAMPLE_IMAGES.map(n => (
                  <ImgCard key={n} src={`/sop/image-ads/example_${n}.png`} alt={`Example ${n}`} dlName={`example_${n}.png`} />
                ))}
              </div>
            </div>

            {/* ── QC ──────────────────────────── */}
            <div id="qc" data-stk-section className={styles.section}>
              <div className={styles.stepHeader}>
                <div className={`${styles.stepNum} ${styles.stepNumQc}`}>QC</div>
                <div>
                  <div className={styles.stepTitle}>
                    Quality Check Before Publishing
                    <small className={styles.stepSub}>Run through this before uploading to Ads Manager</small>
                  </div>
                </div>
              </div>
              <div className={styles.divider} />
              <ul className={styles.checklist}>
                {[
                  'All text is fully visible with no overflow or cropping at card edges',
                  'Highlight colour has strong contrast against the background',
                  'Tag label is credible and appropriate for the brand voice',
                  'No emojis, broken characters, or encoding errors in any card',
                  'Each of the 8 cards uses a different background colour',
                  'Files saved as JPG or PNG, 1080×1080px',
                  'Filenames follow convention: 01_short_description.jpg',
                ].map((item, i) => (
                  <li key={i} className={styles.checklistItem}>
                    <span className={styles.checkmark}>✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Footer */}
          <div className={styles.sopFooter}>
            <strong>Straight To Kill Ad Creative SOP</strong> v1.0
            <div className={styles.sopFooterCopy}>Copyright &copy; 2026 NM Media Sdn. Bhd. All rights reserved.</div>
          </div>

          {/* Back link */}
          <div className="max-w-[880px] mx-auto px-6 py-8 flex items-center justify-between border-t border-[var(--border)]">
            <Link href="/dashboard" className="inline-flex items-center gap-1.5 text-sm text-[var(--muted)] hover:text-[var(--text)] transition-colors group">
              <IconArrowLeft size={13} className="group-hover:-translate-x-0.5 transition-transform" />
              Back to dashboard
            </Link>
            <span className="text-xs text-[var(--subtle)]">End of SOP</span>
          </div>

        </main>
      </div>
    </>
  );
}
