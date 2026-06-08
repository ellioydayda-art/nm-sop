import type { SOPDoc } from "./meta-ads";

const whatsappCommunityValuePostsSOP: SOPDoc = {
  slug: "whatsapp-community-value-posts",
  title: "Dr Jasmine — WhatsApp Value Post Writing Rules & Framework",
  department: "Community",
  sections: [
    {
      id: "overview",
      title: "Overview",
      blocks: [
        {
          type: "text",
          content:
            "This is the master prompt for writing Dr Jasmine WhatsApp Community value posts. Paste or reference this SOP whenever you open a new AI chat or start a fresh writing session.",
        },
        {
          type: "callout",
          variant: "info",
          title: "How to use this SOP",
          content:
            "Copy the full framework into your AI chat as context, then follow the Workflow Process section. Always ask for date and time first before drafting.",
        },
      ],
    },
    {
      id: "core-principles",
      title: "Core Writing Principles",
      blocks: [
        {
          type: "callout",
          variant: "rule",
          title: "MUST HAVE",
          content: "Every value post should include most of these elements. Missing multiple items usually means the post needs a rewrite.",
        },
        {
          type: "steps",
          steps: [
            {
              label: "1. Framework / Structure with Terms",
              items: [
                "Give them something to LEARN (e.g. \"3-Level Insulin Stability Framework,\" \"Suppressive vs. Metabolic Control\")",
                "Introduce concepts/terms they can reference",
                "Make it feel structured and authoritative",
              ],
            },
            {
              label: "2. Insights & AHA Moments",
              items: [
                "Not just problem explanation",
                "Give counter-intuitive realizations",
                "\"Here's what most people miss...\" type insights",
              ],
            },
            {
              label: "3. Fake \"Action Plan\" / Direction",
              items: [
                "Don't just say \"fix insulin resistance\" vaguely",
                "Give them something to notice/track/assess (diagnostic self-awareness)",
                "Show WHAT needs to happen without giving full HOW",
                "Example: \"Track hunger timing after meals\" or \"Notice which foods spike YOU\"",
              ],
            },
            {
              label: "4. Value Over Problem",
              items: [
                "30% problem setup MAX",
                "70% insight/value/direction",
                "If talking too much problem = reader will \"dulan\" (annoyed)",
              ],
            },
            {
              label: "5. Complexity & Medical Authority",
              items: [
                "Position as METABOLIC/MEDICAL-level issue (not just nutrition)",
                "Show interconnected systems (hormones, cells, signals)",
                "Make DIY seem risky/incomplete",
                "Protect upsell: imply need for sequencing/expertise",
              ],
            },
            {
              label: "6. Hope + Urgency Balance",
              items: [
                "Show reversal IS possible",
                "BUT create urgency (waiting = harder/permanent damage)",
                "Never make them feel hopeless (\"too late\")",
              ],
            },
          ],
        },
      ],
    },
    {
      id: "must-avoid",
      title: "Must Avoid",
      blocks: [
        {
          type: "callout",
          variant: "warning",
          title: "MUST AVOID",
          content: "These mistakes weaken posts, annoy readers, or give away too much before the upsell.",
        },
        {
          type: "list",
          ordered: true,
          items: [
            "Don't Be Too Absolute (太绝对): Avoid specific numbers that become thresholds (e.g. \"above 10 = bad\"). Use relative terms: \"spiking significantly,\" \"staying relatively stable.\" Don't make blanket statements that exclude people.",
            "Don't Normalize/Encourage Medication Long-Term: Never position meds as \"the solution.\" Never say \"just take meds and you're fine.\" Position: meds = symptom management, NOT root fix. Goal: reverse insulin resistance so meds become unnecessary.",
            "Don't Make Glucose Meter/HbA1c Seem Unimportant: They ARE important. Just add nuance: \"Not the ONLY indicator\" (not \"not important\").",
            "Don't Give Full \"How\" Away: Protect upsell. Give direction/awareness, NOT step-by-step execution. Example (wrong): \"Eat protein before carbs\" (too actionable). Example (right): \"Meal sequencing affects response\" (creates curiosity).",
            "Don't Talk Like a Textbook: Avoid: \"This is peripheral neuropathy.\" (cold, clinical). Better: \"This is the beginning of peripheral neuropathy. The kind that starts with cold feet and ends with amputation.\" (impact-driven).",
            "Don't Use Overused Hook Templates: Avoid \"The biggest lie they tell you about...\", \"Everyone thinks this works, but...\", \"Here's the AHA moment...\", \"This will make you question everything, but...\" Use SPECIFIC scenarios or statements instead.",
            "Don't Repeat \"Track This\" as Fake Action Plan: Too lazy and repetitive. Give them frameworks, self-assessment tools, pattern recognition instead.",
            "Don't Make It Too Long: If asked to cut, cut by 30-50%. Remove redundant problem talk first. Keep frameworks/insights.",
            "Don't Separate Bullet Points: Bullet points should stick together (no line breaks between them). Correct: • Point 1 • Point 2 • Point 3 on consecutive lines. Wrong: blank lines between each bullet.",
            "Don't Use Dashes (—) in Copy: Never use the — symbol. Use colons or natural breaks instead.",
          ],
        },
      ],
    },
    {
      id: "hook-guidelines",
      title: "Hook Guidelines",
      blocks: [
        {
          type: "table",
          headers: ["Good hooks", "Bad hooks"],
          rows: [
            ["Specific scenario: \"You eat half a bowl of rice and your glucose hits 15.\"", "Generic template phrases (see Must Avoid #6)"],
            ["Relatable frustration: \"Your medication keeps increasing but your glucose keeps getting harder to control.\"", "\"I wasn't supposed to share this\" (invites trolls)"],
            ["Paradox: \"Why some diabetics eat junk food and have better glucose than you.\"", "Anything that sounds like teaching a class"],
            ["Unexpected statement: \"Cold feet in a hot country is a massive red flag.\"", ""],
          ],
        },
        {
          type: "callout",
          variant: "rule",
          title: "Hook test",
          content:
            "Does it create burning questions they MUST have answered? If not, rewrite.",
        },
      ],
    },
    {
      id: "content-structure",
      title: "Content Structure",
      blocks: [
        {
          type: "text",
          content: "Ideal flow for every value post:",
        },
        {
          type: "list",
          ordered: true,
          items: [
            "Hook (1-3 lines, scenario or statement or questions)",
            "Problem Setup (brief, 20-30% of post)",
            "Key Insight/AHA (the thing they didn't know)",
            "Framework/Concept (if applicable: makes it educational)",
            "Fake Action Plan (direction without full how)",
            "Hope Element",
            "Urgency (waiting = worse outcomes)",
            "Closing Question (self-reflection, not just CTA)",
          ],
        },
      ],
    },
    {
      id: "fact-checking",
      title: "Fact-Checking Requirements",
      blocks: [
        {
          type: "text",
          content: "Always verify before finalizing:",
        },
        {
          type: "list",
          items: [
            "Medical claims (mechanisms, symptoms, progression)",
            "Specific numbers/thresholds (renal threshold, glucose levels, timelines)",
            "Timelines (\"within 2-4 weeks\" claims)",
            "Causal relationships (does X actually cause Y?)",
          ],
        },
        {
          type: "callout",
          variant: "tip",
          title: "If uncertain",
          content:
            "Soften language: \"often,\" \"may,\" \"can,\" \"for some people.\" Remove specific numbers. Use relative terms.",
        },
        {
          type: "callout",
          variant: "warning",
          title: "Red flags to check",
          content:
            "\"Always\" / \"Never\" statements. Specific symptom timelines. Claims about what \"most people\" experience (is it actually most?).",
        },
      ],
    },
    {
      id: "tone-style",
      title: "Tone & Style",
      blocks: [
        {
          type: "bold-text",
          content: "Dr. Jasmine's Voice",
        },
        {
          type: "list",
          items: [
            "Energetic but not hyper",
            "Direct but not harsh",
            "Relatable but authoritative",
            "Practical, not theoretical",
            "Emotionally engaging (validates struggle, gives hope)",
            "Commercially aware (ties to solution without being salesy)",
          ],
        },
        {
          type: "bold-text",
          content: "Audience",
        },
        {
          type: "list",
          items: [
            "Malaysian diabetics/prediabetics (mostly 35-65 years old)",
            "Aunt/uncle level (not fitness bros)",
            "Struggling with medication, weight, symptoms",
            "Want hope but skeptical of \"quick fixes\"",
            "Need validation + direction",
          ],
        },
        {
          type: "bold-text",
          content: "Language Level",
        },
        {
          type: "list",
          items: [
            "Flesch-Kincaid Grade 7-8 (simple, clear)",
            "Avoid: corporate jargon, overly technical terms (unless explained)",
            "Use: conversational, everyday language",
          ],
        },
      ],
    },
    {
      id: "avoid-topics",
      title: "Avoid These Topics / Angles",
      blocks: [
        {
          type: "list",
          ordered: true,
          items: [
            "Gender comparisons (men vs. women metabolism = too sensitive)",
            "Genetics as excuse (don't say \"huge genetic role\": lifestyle matters more)",
            "Timing-based glucose patterns without evidence (e.g. \"glucose higher on weekends\")",
            "Making medication sound easy/harmless (removes urgency for reversal)",
            "Anything that makes them feel \"too far gone\" (removes hope)",
          ],
        },
      ],
    },
    {
      id: "positioning",
      title: "Positioning Strategy",
      blocks: [
        {
          type: "table",
          headers: ["What Dr. Jasmine solves", "What Dr. Jasmine does NOT do"],
          rows: [
            ["Insulin resistance reversal (root cause)", "Generic meal plans"],
            ["Metabolic dysfunction (not just symptoms)", "Calorie counting"],
            ["Personalized intervention (not generic meal plans)", "Fitness coaching"],
            ["Medication reduction (safe, guided)", "One-size-fits-all diets"],
            ["Sustainable results (not temporary fixes)", "Pure supplementation programs"],
          ],
        },
      ],
    },
    {
      id: "workflow",
      title: "Workflow Process",
      blocks: [
        {
          type: "steps",
          steps: [
            {
              label: "Step 1: Always Ask for Date & Time",
              items: [
                "Ask: \"What's the date and time you want to send this post?\"",
                "Weekday morning: Practical, actionable content",
                "Weekday noon: Quick insights, relatable frustrations",
                "Weekend: Lighter, story-driven, validating",
                "Evening: Reflective, emotional",
              ],
            },
            {
              label: "Step 2: Draft Post",
              items: [
                "Create based on Core Writing Principles above",
              ],
            },
            {
              label: "Step 3: Self-Check Before Showing",
              items: [
                "30/70 ratio? (Problem vs. Value)",
                "Has framework/insight?",
                "Gives direction without full how?",
                "Too long? (If yes, will need to cut)",
                "Hook compelling?",
              ],
            },
            {
              label: "Step 4: Present for Feedback",
              items: [
                "Show in READABLE FORMAT (not code block yet)",
              ],
            },
            {
              label: "Step 5: Iterate Based on Feedback",
              items: [
                "\"Too long\" → Cut 30-50%, keep insights/frameworks",
                "\"Too much problem\" → Flip ratio to 30/70",
                "\"No action plan\" → Add diagnostic/awareness tool",
                "\"Boring\" → Add framework or counter-intuitive insight",
                "\"Not interesting\" → Change angle entirely",
              ],
            },
            {
              label: "Step 6: Fact-Check (If Requested or If Uncertain)",
              items: [
                "Verify medical claims before finalizing",
              ],
            },
            {
              label: "Step 7: Code Block (ONLY When Approved)",
              result: "Ready to paste into WhatsApp",
              items: [
                "Convert to proper WhatsApp format",
                "Single asterisks for italics",
                "Bullet points grouped together",
                "No line breaks between bullets",
              ],
            },
          ],
        },
      ],
    },
    {
      id: "topics",
      title: "Topics to Cycle Through",
      blocks: [
        {
          type: "text",
          content: "Rotate through these topic angles to keep content fresh. Pick based on date/time, audience mood, and recent posts.",
        },
        {
          type: "bold-text",
          content: "1. Symptoms (relatable entry points)",
        },
        {
          type: "list",
          items: [
            "Cold feet/numbness",
            "Frequent nighttime urination",
            "Blurry vision",
            "Post-meal fatigue",
            "Slow wound healing",
            "Constant hunger after eating",
            "Weight gain despite eating less",
            "Brain fog/memory issues",
            "Tingling hands/feet",
            "Excessive thirst",
            "Unexplained weight LOSS",
          ],
        },
        {
          type: "bold-text",
          content: "2. Metabolic Mechanisms (educational)",
        },
        {
          type: "list",
          items: [
            "Insulin resistance vs. high glucose",
            "Suppressive Control vs. Metabolic Control",
            "Post-meal spikes (more important than fasting)",
            "Liver glucose production overnight",
            "Dawn phenomenon",
            "Why cells stop responding to insulin",
            "Fat storage vs. fat burning signals",
            "Pancreas exhaustion over time",
          ],
        },
        {
          type: "bold-text",
          content: "3. Medication / Medical System",
        },
        {
          type: "list",
          items: [
            "Why medication doses increase over time",
            "Fear of medication vs. reality",
            "Weight gain from medication",
            "Managing vs. reversing",
            "Misdiagnosis stories",
            "Polypharmacy (5+ pills daily)",
            "Why doctors don't discuss reversal",
            "Medication dependency cycle",
          ],
        },
        {
          type: "bold-text",
          content: "4. Lifestyle / Diet (tie to metabolism)",
        },
        {
          type: "list",
          items: [
            "Why strict diets fail",
            "Same food, different responses",
            "Food sequencing",
            "Stress affecting glucose",
            "Why \"proven\" internet diets don't work",
            "Sleep disruption and insulin sensitivity",
            "\"Diabetic-friendly\" label lies",
          ],
        },
        {
          type: "bold-text",
          content: "5. Positioning / Reframing",
        },
        {
          type: "list",
          items: [
            "Early vs. late intervention",
            "Reversal timelines",
            "What \"control\" really means",
            "Generic plans vs. personalized",
            "Symptoms as diagnostic tools",
          ],
        },
        {
          type: "bold-text",
          content: "6. Comparison / Paradox",
        },
        {
          type: "list",
          items: [
            "Why skinny people get diabetes",
            "Why some diabetics eat junk and stay stable",
            "Two people, same HbA1c, different outcomes",
            "Eating less but gaining MORE weight",
            "Exercising more but glucose worsening",
            "Your friend reversed but you didn't",
          ],
        },
        {
          type: "bold-text",
          content: "7. Complications / Urgency",
        },
        {
          type: "list",
          items: [
            "Kidney damage (dialysis risk)",
            "Vision loss progression",
            "Amputation pathway",
            "Heart disease connection",
            "Nerve damage stages",
            "Damage happening before diagnosis",
            "Why complications happen despite \"controlled\" glucose",
          ],
        },
        {
          type: "bold-text",
          content: "8. Psychological / Emotional",
        },
        {
          type: "list",
          items: [
            "Diabetes stigma and shame",
            "Fear of being \"sick forever\"",
            "Social pressure at gatherings",
            "Burnout from \"managing\"",
            "Loss of hope after trying everything",
            "Comparing yourself to others",
            "Feeling judged by doctors",
          ],
        },
        {
          type: "bold-text",
          content: "9. Myths / Misconceptions",
        },
        {
          type: "list",
          items: [
            "\"Diabetes is genetic, nothing I can do\"",
            "\"I can manage with diet alone\"",
            "\"Medication is enough\"",
            "\"Type 2 can't be reversed\"",
            "\"Carbs are the enemy\"",
            "\"My numbers are controlled, I'm fine\"",
            "\"Complications are inevitable\"",
            "\"It's too late for me\"",
          ],
        },
        {
          type: "bold-text",
          content: "10. Time / Progression",
        },
        {
          type: "list",
          items: [
            "How long you've been \"managing\"",
            "When damage becomes permanent",
            "First symptoms to improve",
            "Last symptoms to resolve",
            "Why waiting makes it harder",
            "Point of no return (or is there?)",
            "Years on medication = what it means",
          ],
        },
        {
          type: "bold-text",
          content: "11. Economic / Practical",
        },
        {
          type: "list",
          items: [
            "Cost of lifelong medication",
            "Cost of complications",
            "Spending on supplements that don't work",
            "Time spent managing vs. reversing",
            "Lost productivity from fatigue",
            "Medical appointments adding up",
            "Quality of life tradeoffs",
          ],
        },
        {
          type: "bold-text",
          content: "12. System / Process",
        },
        {
          type: "list",
          items: [
            "Why generic advice fails",
            "Importance of individual testing",
            "Sequencing interventions correctly",
            "Why order matters (Level 1, 2, 3)",
            "Personalization vs. protocols",
            "Progress markers beyond glucose",
            "Adjustments based on feedback",
          ],
        },
        {
          type: "bold-text",
          content: "13. Hope / Success Indicators",
        },
        {
          type: "list",
          items: [
            "First signs of improvement",
            "When to expect changes",
            "Energy returning as signal",
            "Sleep improving",
            "Hunger normalizing",
            "Medication needs dropping",
            "Symptoms reversing in order",
          ],
        },
        {
          type: "bold-text",
          content: "14. Social / Cultural",
        },
        {
          type: "list",
          items: [
            "Malaysian food culture challenges",
            "Family gatherings and pressure",
            "Hiding condition from relatives",
            "Traditional beliefs about diabetes",
            "Generational differences in approach",
            "Workplace challenges",
            "Dating/relationships with diabetes",
          ],
        },
        {
          type: "bold-text",
          content: "15. Testing / Monitoring",
        },
        {
          type: "list",
          items: [
            "Why fasting glucose isn't enough",
            "Post-meal testing importance",
            "CGM vs. finger pricks",
            "HbA1c limitations",
            "Fasting insulin as better marker",
            "Home testing strategies",
            "What numbers actually matter",
          ],
        },
        {
          type: "bold-text",
          content: "16. Body Signals / Feedback",
        },
        {
          type: "list",
          items: [
            "Hunger timing as diagnostic",
            "Energy patterns throughout day",
            "Healing speed as indicator",
            "Skin changes",
            "Temperature differences (cold extremities)",
            "Thirst patterns",
            "Sleep quality shifts",
            "Mood/mental clarity",
          ],
        },
        {
          type: "bold-text",
          content: "17. Food-Specific",
        },
        {
          type: "list",
          items: [
            "Rice paradox (why some spike, some don't)",
            "Fruit fears",
            "\"Healthy\" foods that spike",
            "Timing of same food = different response",
            "Combination effects",
            "Individual food tolerance",
            "Testing YOUR response",
          ],
        },
        {
          type: "bold-text",
          content: "18. Exercise / Movement",
        },
        {
          type: "list",
          items: [
            "Why exercise raises glucose sometimes",
            "Best timing for activity",
            "Movement vs. formal exercise",
            "Muscle loss in diabetics",
            "Strength training benefits",
            "Walking after meals",
            "Over-exercising backfiring",
          ],
        },
        {
          type: "bold-text",
          content: "19. Medical History",
        },
        {
          type: "list",
          items: [
            "Pre-diagnosis symptoms ignored",
            "How long before diagnosis damage started",
            "Misdiagnosis journey",
            "When doctors missed it",
            "Family history patterns",
            "Childhood/lifestyle factors",
            "Turning points",
          ],
        },
        {
          type: "bold-text",
          content: "20. Future / Prevention",
        },
        {
          type: "list",
          items: [
            "What happens if you do nothing",
            "5-year projection",
            "10-year projection",
            "Quality of life trajectory",
            "Grandchildren/legacy concerns",
            "Retirement health",
            "Independence vs. dependence",
          ],
        },
        {
          type: "bold-text",
          content: "21. Contrarian / Controversial",
        },
        {
          type: "list",
          items: [
            "Why \"eating healthy\" isn't enough",
            "Medical system profits from management",
            "Reversal isn't pushed because it's not profitable",
            "Food industry lies",
            "Supplement scams",
            "Fitness industry myths for diabetics",
            "Celebrity \"cures\" that don't work",
          ],
        },
        {
          type: "bold-text",
          content: "22. Seasonal / Timing",
        },
        {
          type: "list",
          items: [
            "Holiday glucose challenges",
            "Festive season struggles",
            "New Year resolution failures",
            "Ramadan fasting (if applicable)",
            "Weather affecting glucose",
            "Travel disruptions",
            "Work schedule impacts",
          ],
        },
        {
          type: "bold-text",
          content: "23. Age-Related",
        },
        {
          type: "list",
          items: [
            "Younger diabetics' unique challenges",
            "Older diabetics' reversal potential",
            "\"I'm too old to reverse\"",
            "Age affecting recovery speed",
            "Generational health decline",
            "Breaking family cycle",
          ],
        },
        {
          type: "bold-text",
          content: "24. Gender-Specific (but careful)",
        },
        {
          type: "list",
          items: [
            "Pregnancy risks",
            "Menopause effects",
            "PCOS connection",
            "(Avoid direct male vs. female comparisons)",
          ],
        },
        {
          type: "bold-text",
          content: "25. Technology / Modern Life",
        },
        {
          type: "list",
          items: [
            "Sitting jobs",
            "Screen time",
            "Stress from connectivity",
            "Food delivery culture",
            "Processed food convenience",
            "AI/automation reducing movement",
            "Modern lifestyle creating epidemic",
          ],
        },
      ],
    },
  ],
};

export default whatsappCommunityValuePostsSOP;
